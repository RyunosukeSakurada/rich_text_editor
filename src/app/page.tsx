'use client'

import React, { useState } from 'react'
import TextAreaAutosize from 'react-textarea-autosize'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

const Page = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const Editor = useMemo(
    () => dynamic(() => import('@/components/Editor'), { ssr: false }),
    []
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value)
  }

  const handleEditorChange = (markdownContent: string) => {
    setContent(markdownContent)
  }

  const handleSave = () => {
    console.log('Title:', title);
    console.log('Content:', content);
  };

  return (
    <div className='min-h-screen'>
      <p className='text-center my-6 text-xl'>Rich Text Editor</p>
      <div className='flex flex-col px-24 py-18 w-full'>
        <TextAreaAutosize
          placeholder='Untitled'
          className='w-full resize-none overflow-hidden appearance-none bg-transparent text-5xl font-bold focus:outline-none'
          value={title}
          onChange={handleTitleChange}
        />
        <Editor onChange={handleEditorChange} />
        <button onClick={handleSave}>保存する</button>
      </div>
    </div>
  )
}

export default Page
