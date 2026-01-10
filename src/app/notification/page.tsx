"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, TrashIcon } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  icon: string;
  category: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New message from Sarah",
      description: "You have a new message about the project update",
      timestamp: new Date(Date.now() - 5 * 60000),
      isRead: false,
      icon: "💬",
      category: "message",
    },
    {
      id: "2",
      title: "System update completed",
      description: "Your system has been successfully updated to v2.1.0",
      timestamp: new Date(Date.now() - 30 * 60000),
      isRead: true,
      icon: "✓",
      category: "system",
    },
    {
      id: "3",
      title: "Payment received",
      description: "Payment of $1,500 has been received and processed",
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      isRead: false,
      icon: "💳",
      category: "payment",
    },
    {
      id: "4",
      title: "Team invitation",
      description: "You have been invited to join the Design team",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60000),
      isRead: true,
      icon: "👥",
      category: "team",
    },
    {
      id: "5",
      title: "Report is ready",
      description: "Your monthly analytics report has been generated",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60000),
      isRead: false,
      icon: "📊",
      category: "report",
    },
  ]);

  const handleToggleRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: !notif.isRead } : notif
      )
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  return (
    <main className='min-h-screen bg-white rounded-xl!'>
      {/* Header */}
      <header className='sticky top-0 z-40 bg-white backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-foreground'>
                Notifications
              </h1>
              <p className='text-sm text-muted-foreground'>
                {unreadCount} unread out of {notifications.length} total
              </p>
            </div>
            {unreadCount > 0 && (
              <Button
                onClick={handleMarkAllAsRead}
                variant='outline'
                className='w-full sm:w-auto bg-transparent'
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Notification List */}
      {notifications.length === 0 ? (
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
              {notifications.map((notification) => (
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
                      notification.isRead
                        ? "border-border bg-card hover:bg-muted"
                        : "border-blue-300/50 bg-blue-50/30 dark:border-blue-900/50 dark:bg-blue-950/20 hover:border-blue-300 dark:hover:border-blue-800"
                    }`}
                  >
                    <div className='flex flex-1 gap-4'>
                      {/* Icon */}
                      <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted text-lg'>
                        {notification.icon}
                      </div>

                      {/* Content */}
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-start gap-2'>
                          <h3 className='font-semibold text-foreground text-pretty'>
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className='mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500' />
                          )}
                        </div>
                        <p className='mt-1 text-sm text-muted-foreground text-pretty'>
                          {notification.description}
                        </p>
                        <p className='mt-2 text-xs text-muted-foreground'>
                          {/* {formatDistanceToNow(notification.timestamp, {
                            addSuffix: true,
                          })} */}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className='flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleToggleRead(notification.id)}
                        title={
                          notification.isRead
                            ? "Mark as unread"
                            : "Mark as read"
                        }
                        className='shrink-0'
                      >
                        {notification.isRead ? (
                          <BookmarkCheck className='h-4 w-4' />
                        ) : (
                          <Bookmark className='h-4 w-4' />
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
    </main>
  );
}
