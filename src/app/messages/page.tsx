"use client";

import { useState, useMemo, Suspense } from "react";
import { Search, Trash2, Bell, Settings } from "lucide-react";

interface Message {
  id: string;
  name: string;
  avatar: string;
  preview: string;
  time: string;
  unread: boolean;
  color: string;
}

interface SearchAndSort {
  searchTerm: string;
  sortBy: "recent" | "name" | "unread";
}

function MessageListContent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      name: "Alex Molar",
      avatar: "👨‍💼",
      preview: "Hi, How are You?",
      time: "2:00 PM",
      unread: false,
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "2",
      name: "Alex Molar",
      avatar: "👨‍💼",
      preview: "Hi, How are You?",
      time: "2:00 PM",
      unread: false,
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "3",
      name: "Alex Molar",
      avatar: "👨‍💼",
      preview: "Hi, How are You?",
      time: "2:00 PM",
      unread: true,
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "4",
      name: "Alex Molar",
      avatar: "👨‍💼",
      preview: "Hi, How are You?",
      time: "2:00 PM",
      unread: false,
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "5",
      name: "Alex Molar",
      avatar: "👨‍💼",
      preview: "Hi, How are You?",
      time: "2:00 PM",
      unread: false,
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "6",
      name: "Alex Molar",
      avatar: "👨‍💼",
      preview: "Hi, How are You?",
      time: "2:00 PM",
      unread: false,
      color: "from-blue-400 to-blue-600",
    },
  ]);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [searchAndSort, setSearchAndSort] = useState<SearchAndSort>({
    searchTerm: "",
    sortBy: "recent",
  });
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredMessages = useMemo(() => {
    const filtered = messages.filter(
      (msg) =>
        msg.name
          .toLowerCase()
          .includes(searchAndSort.searchTerm.toLowerCase()) ||
        msg.preview
          .toLowerCase()
          .includes(searchAndSort.searchTerm.toLowerCase())
    );

    if (searchAndSort.sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (searchAndSort.sortBy === "unread") {
      filtered.sort((a, b) => (b.unread ? 1 : -1) - (a.unread ? 1 : -1));
    }

    return filtered;
  }, [messages, searchAndSort]);

  const handleDelete = (id: string) => {
    setMessages(messages.filter((msg) => msg.id !== id));
    if (selectedMessage === id) setSelectedMessage(null);
  };

  const handleToggleRead = (id: string) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, unread: !msg.unread } : msg
      )
    );
  };

  const handleSelectMessage = (id: string) => {
    setSelectedMessage(id);
  };

  const unreadCount = messages.filter((msg) => msg.unread).length;

  return (
    <div className='flex flex-col md:flex-row h-screen bg-background'>
      <div className='w-full md:w-96 flex flex-col border-r border-border bg-card'>
        {/* Header */}
        <div className='p-4 border-b border-border'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-2xl font-bold text-foreground'>Messages</h1>
            <div className='flex gap-2'>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className='p-2 hover:bg-muted rounded-lg transition-colors relative'
              >
                <Bell size={20} className='text-foreground' />
                {unreadCount > 0 && (
                  <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                    {unreadCount}
                  </span>
                )}
              </button>
              <button className='p-2 hover:bg-muted rounded-lg transition-colors'>
                <Settings size={20} className='text-foreground' />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className='relative'>
            <Search
              size={18}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'
            />
            <input
              type='text'
              placeholder='Search messages...'
              value={searchAndSort.searchTerm}
              onChange={(e) =>
                setSearchAndSort({
                  ...searchAndSort,
                  searchTerm: e.target.value,
                })
              }
              className='w-full pl-10 pr-4 py-2 bg-muted rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all'
            />
          </div>
        </div>

        {/* Sort Options */}
        <div className='px-4 py-2 flex gap-2 overflow-x-auto'>
          {(["recent", "name", "unread"] as const).map((sort) => (
            <button
              key={sort}
              onClick={() =>
                setSearchAndSort({ ...searchAndSort, sortBy: sort })
              }
              className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                searchAndSort.sortBy === sort
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {sort === "recent"
                ? "Recent"
                : sort === "name"
                ? "Name"
                : "Unread"}
            </button>
          ))}
        </div>

        {/* Message List */}
        <div className='flex-1 overflow-y-auto'>
          {filteredMessages.length > 0 ? (
            <div className='space-y-0'>
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleSelectMessage(msg.id)}
                  className={`p-4 border-b border-border cursor-pointer transition-colors ${
                    selectedMessage === msg.id
                      ? "bg-muted"
                      : "bg-card hover:bg-muted/50"
                  } ${msg.unread ? "bg-muted/70" : ""}`}
                >
                  <div className='flex gap-3 items-start'>
                    {/* Avatar */}
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${msg.color} flex items-center justify-center flex-shrink-0 text-xl`}
                    >
                      {msg.avatar}
                    </div>

                    {/* Message Content */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-baseline justify-between gap-2'>
                        <h3
                          className={`font-semibold text-foreground ${
                            msg.unread ? "font-bold" : ""
                          }`}
                        >
                          {msg.name}
                        </h3>
                        <span className='text-xs text-muted-foreground flex-shrink-0'>
                          {msg.time}
                        </span>
                      </div>
                      <p
                        className={`text-sm truncate ${
                          msg.unread
                            ? "text-foreground font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
                        {msg.preview}
                      </p>
                    </div>

                    {/* Unread Indicator */}
                    {msg.unread && (
                      <div className='w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2' />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center h-full text-center p-6'>
              <Search size={40} className='text-muted-foreground mb-2' />
              <p className='text-muted-foreground'>No messages found</p>
            </div>
          )}
        </div>
      </div>

      <div className='hidden md:flex flex-col flex-1 bg-background'>
        {selectedMessage ? (
          (() => {
            const selected = messages.find((m) => m.id === selectedMessage);
            return selected ? (
              <>
                {/* Detail Header */}
                <div className='p-6 border-b border-border flex items-center justify-between bg-card'>
                  <div className='flex items-center gap-4'>
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${selected.color} flex items-center justify-center text-3xl`}
                    >
                      {selected.avatar}
                    </div>
                    <div>
                      <h2 className='text-2xl font-bold text-foreground'>
                        {selected.name}
                      </h2>
                      <p className='text-muted-foreground'>{selected.time}</p>
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => handleToggleRead(selected.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selected.unread
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {selected.unread ? "Mark as Read" : "Mark as Unread"}
                    </button>
                    <button
                      onClick={() => handleDelete(selected.id)}
                      className='px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors flex items-center gap-2'
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Message Content */}
                <div className='flex-1 p-6 flex flex-col justify-center'>
                  <div className='bg-card p-6 rounded-lg border border-border'>
                    <p className='text-lg text-foreground leading-relaxed mb-4'>
                      &quot;{selected.preview}&quot;
                    </p>
                    <p className='text-muted-foreground'>
                      Received at {selected.time}
                    </p>
                  </div>
                </div>

                {/* Reply Box */}
                <div className='p-6 border-t border-border bg-card'>
                  <div className='flex gap-3'>
                    <input
                      type='text'
                      placeholder='Type your reply...'
                      className='flex-1 px-4 py-2 bg-muted rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all'
                    />
                    <button className='px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium'>
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : null;
          })()
        ) : (
          <div className='flex flex-col items-center justify-center h-full text-center'>
            <div className='w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4'>
              <Search size={40} className='text-muted-foreground' />
            </div>
            <h2 className='text-xl font-semibold text-foreground mb-2'>
              Select a message
            </h2>
            <p className='text-muted-foreground'>
              Choose a conversation to view details and reply
            </p>
          </div>
        )}
      </div>

      {selectedMessage && (
        <div className='md:hidden fixed inset-0 bg-black/50 z-50'>
          <div className='absolute inset-0 flex flex-col bg-background'>
            {(() => {
              const selected = messages.find((m) => m.id === selectedMessage);
              return selected ? (
                <>
                  {/* Mobile Header */}
                  <div className='p-4 border-b border-border flex items-center justify-between'>
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className='text-primary font-medium'
                    >
                      ← Back
                    </button>
                    <h2 className='font-bold text-foreground'>
                      {selected.name}
                    </h2>
                    <button
                      onClick={() => handleDelete(selected.id)}
                      className='text-destructive'
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {/* Mobile Message Content */}
                  <div className='flex-1 p-4 flex flex-col justify-center'>
                    <div className='bg-card p-4 rounded-lg border border-border mb-4'>
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${selected.color} flex items-center justify-center mb-3 text-lg`}
                      >
                        {selected.avatar}
                      </div>
                      <p className='font-semibold text-foreground mb-1'>
                        {selected.name}
                      </p>
                      <p className='text-sm text-muted-foreground mb-3'>
                        {selected.time}
                      </p>
                      <p className='text-foreground leading-relaxed'>
                        &quot;{selected.preview}&quot;
                      </p>
                    </div>
                  </div>

                  {/* Mobile Reply Box */}
                  <div className='p-4 border-t border-border flex gap-2'>
                    <input
                      type='text'
                      placeholder='Reply...'
                      className='flex-1 px-3 py-2 bg-muted rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm'
                    />
                    <button className='px-4 py-2 bg-primary text-primary-foreground rounded font-medium'>
                      Send
                    </button>
                  </div>
                </>
              ) : null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MessageList() {
  return (
    <Suspense fallback={null}>
      <MessageListContent />
    </Suspense>
  );
}
