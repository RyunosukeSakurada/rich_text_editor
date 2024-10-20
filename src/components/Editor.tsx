'use client'

import React from 'react'
import { BlockNoteEditor, PartialBlock, locales } from '@blocknote/core'
import { BlockNoteView } from '@blocknote/mantine'
import { useCreateBlockNote } from '@blocknote/react'
import "@blocknote/mantine/style.css";
import CharacterCount from '@tiptap/extension-character-count';

type EditorProps = {
  onChange: (content: string) => void
  initialContent?: string
  editable?: boolean
}
const limit = 400;

const Editor: React.FC<EditorProps> = ({
  onChange,
  initialContent,
  editable,
}) => {
  const editor: BlockNoteEditor = useCreateBlockNote({
    dictionary: locales.ja,
    _tiptapOptions: {
      extensions: [
        CharacterCount.configure({
          limit,
        }),
      ],
    },
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