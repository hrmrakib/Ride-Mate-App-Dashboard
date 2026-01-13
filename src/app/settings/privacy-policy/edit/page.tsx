"use client";

import { useEffect, useRef, useState } from "react";
import Quill from "quill";
// @ts-ignore
import "quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";

import Loading from "@/components/loading/Loading";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  useGetPrivacyPolicyQuery,
  useUpdateContextMutation,
} from "@/redux/features/setting/settingAPI";
import { ArrowLeft } from "lucide-react";

const EditPrivacyPolicy = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const { data: privacyPolicy, isLoading } = useGetPrivacyPolicyQuery({});

  const [setPrivacyPolicy, { isLoading: isSaving }] =
    useUpdateContextMutation();

  useEffect(() => {
    let initialized = false;

    const init = async () => {
      if (initialized || quillRef.current) return;
      initialized = true;

      const Quill = (await import("quill")).default;

      if (editorRef.current && !editorRef.current.querySelector(".ql-editor")) {
        const quill = new Quill(editorRef.current, {
          theme: "snow",
          placeholder: "Enter your Terms and Conditions...",
        });

        quillRef.current = quill;

        if (privacyPolicy?.content) {
          quill.root.innerHTML = privacyPolicy.content;
          setContent(privacyPolicy.content);
        }

        quill.on("text-change", () => {
          setContent(quill.root.innerHTML);
        });
      }
    };

    if (typeof window !== "undefined") {
      init();
    }

    return () => {
      initialized = true;
    };
  }, [privacyPolicy]);

  if (isLoading && !privacyPolicy && !quillRef.current) return <Loading />;

  const handleSubmit = async () => {
    try {
      const res = await setPrivacyPolicy({
        page_name: "privacy-policy",
        content: content,
      }).unwrap();
      
      if (res?.content) {
        toast.success("Privacy Policy saved successfully!");
        router.push("/settings");
      } else {
        toast.error("Failed to save.");
      }
    } catch {
      toast.error("Save failed.");
    }
  };

  return (
    <div className='min-h w-[96%] mx-auto flex flex-col justify-between gap-6'>
      <div className='my-2 flex items-center justify-between'>
        <button
          onClick={() => router.back()}
          className='inline-flex items-center text-primary hover:text-[#012B5B] cursor-pointer'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          <span className='text-xl font-semibold'>Privacy Policy</span>
        </button>
      </div>

      <div className='space-y-6'>
        <div className='h-auto'>
          <div
            ref={editorRef}
            className='h-[50vh] bg-white text-black text-base'
            id='quill-editor'
          />
        </div>
      </div>

      <div className='flex justify-end'>
        <Button
          onClick={handleSubmit}
          disabled={isSaving}
          className='w-auto! h-11! button'
        >
          {isSaving ? "Saving..." : "Save Content"}
        </Button>
      </div>
    </div>
  );
};

export default EditPrivacyPolicy;
