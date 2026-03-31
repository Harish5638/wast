"use client";

import { useState } from 'react';
import { PostCard } from "@/components/community/post-card";
import { CreatePostForm } from "@/components/community/create-post-form";
import { createCommunityPost } from "./actions";
import { useRouter } from "next/navigation";

export function CommunityClient({ initialPosts, currentUser }: { initialPosts: any[], currentUser: any }) {
    const [posts, setPosts] = useState(initialPosts);
    const router = useRouter();

    const handleLike = (postId: string) => {
        setPosts(posts.map(p => p.id === postId ? {...p, likes: p.likes + 1} : p));
        // To be implemented: actually save like to DB
    }
    
    const handleComment = (postId: string) => {
        alert(`Commenting on post ${postId}... (feature coming soon!)`);
    }

    const handlePostCreated = async (newPost: { content: string; imageUrl?: string }) => {
        // Optimistic update
        const optimisticPost = {
            id: `temp_${crypto.randomUUID()}`,
            author: currentUser,
            content: newPost.content,
            imageUrl: newPost.imageUrl,
            createdAt: new Date().toISOString(),
            likes: 0,
            comments: []
        };
        setPosts([optimisticPost, ...posts]);
        
        // Save to DB
        const result = await createCommunityPost(newPost.content, newPost.imageUrl);
        if (result?.success) {
            router.refresh();
        }
    };

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <CreatePostForm onPostCreated={handlePostCreated} />

      {posts.map((post) => (
        <PostCard 
            key={post.id} 
            post={post}
            onLike={handleLike}
            onComment={handleComment}
        />
      ))}
    </div>
  );
}
