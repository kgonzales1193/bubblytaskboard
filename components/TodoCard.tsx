"use client";

import { useEffect, useState } from "react";
import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import getUrl from "@/lib/getUrl";
import Image from "next/image";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const deleteTask = useBoardStore((state) => state.deleteTask);

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };
      fetchImage();
    }
  }, [todo]);
  return (
    <div
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      className='bg-white rounded-md space-y-2 drop-shadow-md'>
      <div className='flex justify-between items-center p-5'>
        <p>{todo.title}</p>
        <button
          className='text-red-500 hover:text-red-600'
          onClick={() => deleteTask(index, todo, id)}>
          <XCircleIcon className='ml-5 h-8 w-8 ' />
        </button>
      </div>
      {/* Add image here */}
      {imageUrl && (
        <div className='h-full w-full rounded-b-md'>
          <Image
            src={imageUrl}
            alt='task image'
            width={400}
            height={200}
            className='w-full object-contain rounded-b-md'
          />
        </div>
      )}
    </div>
  );
}
export default TodoCard;
