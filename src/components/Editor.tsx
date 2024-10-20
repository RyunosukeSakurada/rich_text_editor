'use client'

import React from 'react'
import { BlockNoteEditor, PartialBlock, locales } from '@blocknote/core'
import { BlockNoteView } from '@blocknote/mantine'
import { useCreateBlockNote } from '@blocknote/react'
import "@blocknote/mantine/style.css";

type EditorProps = {
  onChange: (content: string) => void
  initialContent?: string
  editable?: boolean
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  initialContent,
  editable,
}) => {
  const editor: BlockNoteEditor = useCreateBlockNote({
    dictionary: locales.ja,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined
  })

  const handleEditorChange = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    onChange(markdown)
  }

  return (
    <div className='-mx-[54px] my-4'>
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme='light'
        onChange={handleEditorChange}
      />
    </div>
  )
}

export default Editor