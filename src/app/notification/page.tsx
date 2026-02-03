/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, TrashIcon } from "lucide-react";
import {
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
  useToggleNotificationsMutation,
} from "@/redux/features/notification/notificationAPI";
import moment from "moment";
import { toast } from "sonner";

interface INotification {
  id: string;
  timestamp: string; // ISO date string
  user_id: string;
  path: string;
  content: string;
  unread: boolean;
}

export default function NotificationsPage() {
  const { data, refetch } = useGetNotificationsQuery({});
  const [toggleNotificationsMutation] = useToggleNotificationsMutation();
  const [deleteNotificationMutation] = useDeleteNotificationMutation();

  const notifications = data?.data;

  const unreadCount = notifications?.filter(
    (noti: any) => noti.unread === false,
  );

  const handleToggleRead = async (id: string, unread: boolean) => {
    // console.log(id, unread);
    // return;
    // if (unread) {
    //   unread = false;
    // } else {
    //   unread = true;
    // }

    try {
      const res = await toggleNotificationsMutation({
        activity_id: id,
        unread: !unread,
      }).unwrap();

      if (res?.count) {
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setTimeout(() => {
        refetch();
      }, 1400);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteNotificationMutation({
        activity_id: id,
      }).unwrap();

      if (res?.count) {
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  const handleDeleteAll = async () => {
    try {
      const res = await deleteNotificationMutation({}).unwrap();

      if (res?.count) {
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const res = await deleteNotificationMutation({}).unwrap();

      if (res?.count) {
        refetch();
        toast.success("All notification delete successfully!");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    } finally {
      refetch();
    }
  };

  return (
    <main className='bg-transparent rounded-xl! p-6'>
      <div className='bg-white! rounded-xl!'>
        {/* Header */}
        <header className='sticky top-0 z-40 bg-white rounded-xl! backdrop-blur supports-[backdrop-filter]:bg-background/60'>
          <div className='mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <h1 className='text-3xl font-bold text-foreground'>
                  Notifications
                </h1>
                <p className='text-sm text-muted-foreground'>
                  {unreadCount?.length} unread out of {notifications?.length}{" "}
                  total
                </p>
              </div>
              <div className='flex items-center gap-5'>
                {notifications?.length > 0 && (
                  <Button
                    onClick={handleDeleteAll}
                    variant='secondary'
                    className='w-full sm:w-auto bg-transparent border border-gray-300 cursor-pointer'
                  >
                    Delete all
                  </Button>
                )}
                {unreadCount?.length > 0 && (
                  <Button
                    onClick={handleMarkAllAsRead}
                    variant='secondary'
                    className='w-full sm:w-auto bg-transparent border border-gray-300 cursor-pointer'
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Notification List */}
        {notifications?.length === 0 ? (
          <div className='mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8'>
            <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card p-12 text-center'>
              <p className='text-lg font-medium text-muted-foreground'>
                No notifications yet
              </p>
              <p className='mt-1 text-sm text-muted-foreground'>
                You are all caught up!
              </p>
            </div>
          </div>
        ) : (
          <div className='mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8'>
            <div className='space-y-3'>
              <AnimatePresence mode='popLayout'>
                {notifications?.map((notification: INotification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Notification Item */}
                    <div
                      className={`group flex flex-col gap-4 rounded-lg border p-4 transition-all duration-200 sm:flex-row sm:items-start sm:justify-between ${
                        notification.unread
                          ? "border-border bg-card hover:bg-muted"
                          : "border-blue-100 bg-blue-50/30 dark:border-blue-900/50 dark:bg-blue-950/20 hover:border-blue-300 dark:hover:border-blue-800"
                      }`}
                    >
                      <div className='flex flex-1 gap-4'>
                        {/* Content */}
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-start gap-2'>
                            <h3 className='font-semibold text-foreground text-pretty'>
                              {notification?.content}
                            </h3>
                            {!notification.unread && (
                              <div className='mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500' />
                            )}
                          </div>
                          <p className='mt-1 text-sm text-[#333333] text-pretty'>
                            {moment
                              .utc(notification.timestamp)
                              .local()
                              .fromNow()}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      {/* sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity */}
                      <div className='flex gap-2'>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() =>
                            handleToggleRead(
                              notification.id,
                              notification.unread,
                            )
                          }
                          title={
                            notification.unread
                              ? "Mark as unread"
                              : "Mark as read"
                          }
                          className='shrink-0 text-black'
                        >
                          {notification.unread ? (
                            <BookmarkCheck className='h-6 w-6' />
                          ) : (
                            <Bookmark className='h-6 w-6' />
                          )}
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleDelete(notification.id)}
                          title='Delete notification'
                          className='shrink-0 text-destructive hover:text-destructive'
                        >
                          <TrashIcon className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
