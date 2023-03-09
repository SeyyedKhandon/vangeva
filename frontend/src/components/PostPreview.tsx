import { Post } from "../types";
import { HiOutlineTrash } from "react-icons/hi";

export default function PostPreview({
  post,
  deletePost,
  isProtected = false,
}: {
  post: Post;
  deletePost: () => void;
  isProtected: boolean;
}) {
  return (
    <>
      <h3> {post.author}</h3>
      {post.thumbnailUrl && (
        <img src={post.thumbnailUrl} alt={post.title} className="w-20" />
      )}
      <ol className="">
        <li className="ml-6">
          <div className="flex gap-1 items-center">
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              {post.title}
            </h3>
            {isProtected && (
              <HiOutlineTrash
                className="text-red-500 cursor-pointer"
                onClick={deletePost}
                title="Remove Post"
              />
            )}
          </div>
          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Released on {new Date(post.createdAt).toLocaleDateString()}
          </time>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            {post.text}{" "}
          </p>
        </li>
      </ol>
    </>
  );
}
