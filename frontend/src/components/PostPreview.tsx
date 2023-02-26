import { Post } from "../types";

export default function PostPreview({ post }: { post: Post }) {
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      <li className="ml-6">
        <span className="absolute flex items-center justify-center w-2 h-2 bg-blue-100 rounded-full -left-1 ring-white dark:ring-gray-900 dark:bg-blue-900">
          <svg
            viewBox="0 0 9 9"
            className="hidden absolute  text-slate-200 dark:text-slate-600  h-[calc(0.5rem+1px)] overflow-visible sm:block"
          >
            <circle
              cx="4.5"
              cy="4.5"
              r="4.5"
              stroke="currentColor"
              className="fill-white dark:fill-slate-900"
              strokeWidth="2"
            ></circle>
          </svg>
        </span>
        <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
          {post.title}
        </h3>
        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          Released on {new Date(post.createdAt).toLocaleDateString()}
        </time>
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          {post.text}{" "}
        </p>
        <a
          className="flex items-center text-sm text-sky-500 font-medium"
          href="#"
        >
          <span className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl"></span>
          <span className="relative">
            Read more
            <span className="sr-only">
              , Tailwind CSS v3.2: Dynamic breakpoints, multi-config, and
              container queries, oh my!
            </span>
          </span>
          <svg
            className="relative mt-px overflow-visible ml-2.5 text-sky-300 dark:text-sky-700"
            width="3"
            height="6"
            viewBox="0 0 3 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M0 0L3 3L0 6"></path>
          </svg>
        </a>
      </li>
    </ol>
  );
}
