'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CldUploadWidget } from 'next-cloudinary';
import { isCloudinaryConfigured } from '@/lib/cloudinary-config';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  label?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing...',
  label,
}: RichTextEditorProps) {
  const { t } = useAdminLocale();
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const isCloudinaryAvailable = isCloudinaryConfigured();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: false,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[300px] px-4 py-3',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = (url: string) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  const MenuButton = ({
    onClick,
    isActive = false,
    disabled = false,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
        isActive ? 'bg-gray-200 text-blue-600' : 'text-gray-700'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}

      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
        {/* Toolbar */}
        <div className="border-b border-gray-200 bg-gray-50 p-2 flex flex-wrap gap-1">
          {/* Text Formatting */}
          <div className="flex gap-1 border-r border-gray-300 pr-2">
            <MenuButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
              title="Bold (Ctrl+B)"
            >
              <Bold className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
              title="Italic (Ctrl+I)"
            >
              <Italic className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive('underline')}
              title="Underline (Ctrl+U)"
            >
              <UnderlineIcon className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive('strike')}
              title="Strikethrough"
            >
              <Strikethrough className="h-4 w-4" />
            </MenuButton>
          </div>

          {/* Headings */}
          <div className="flex gap-1 border-r border-gray-300 pr-2">
            <MenuButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              isActive={editor.isActive('heading', { level: 1 })}
              title="Heading 1"
            >
              <Heading1 className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              isActive={editor.isActive('heading', { level: 2 })}
              title="Heading 2"
            >
              <Heading2 className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              isActive={editor.isActive('heading', { level: 3 })}
              title="Heading 3"
            >
              <Heading3 className="h-4 w-4" />
            </MenuButton>
          </div>

          {/* Lists */}
          <div className="flex gap-1 border-r border-gray-300 pr-2">
            <MenuButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </MenuButton>
          </div>

          {/* Text Alignment */}
          <div className="flex gap-1 border-r border-gray-300 pr-2">
            <MenuButton
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              isActive={editor.isActive({ textAlign: 'left' })}
              title="Align Left"
            >
              <AlignLeft className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              isActive={editor.isActive({ textAlign: 'center' })}
              title="Align Center"
            >
              <AlignCenter className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              isActive={editor.isActive({ textAlign: 'right' })}
              title="Align Right"
            >
              <AlignRight className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              isActive={editor.isActive({ textAlign: 'justify' })}
              title="Justify"
            >
              <AlignJustify className="h-4 w-4" />
            </MenuButton>
          </div>

          {/* Quote & Code */}
          <div className="flex gap-1 border-r border-gray-300 pr-2">
            <MenuButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive('blockquote')}
              title="Quote"
            >
              <Quote className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              isActive={editor.isActive('codeBlock')}
              title="Code Block"
            >
              <Code className="h-4 w-4" />
            </MenuButton>
          </div>

          {/* Link */}
          <div className="flex gap-1 border-r border-gray-300 pr-2">
            <MenuButton
              onClick={() => setShowLinkInput(!showLinkInput)}
              isActive={editor.isActive('link')}
              title="Add Link"
            >
              <LinkIcon className="h-4 w-4" />
            </MenuButton>
            {editor.isActive('link') && (
              <MenuButton
                onClick={() => editor.chain().focus().unsetLink().run()}
                title="Remove Link"
              >
                <Unlink className="h-4 w-4" />
              </MenuButton>
            )}
          </div>

          {/* Image Upload */}
          {isCloudinaryAvailable && (
            <div className="flex gap-1 border-r border-gray-300 pr-2">
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                signatureEndpoint="/api/admin/upload"
                options={{
                  folder: 'elma-vize/content',
                  maxFiles: 1,
                  resourceType: 'image',
                  clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
                  maxFileSize: 10485760,
                  sources: ['local', 'url'],
                }}
                onSuccess={(result: any) => {
                  console.log('Editor image upload SUCCESS:', result);
                  const url = result?.info?.secure_url;
                  if (url) {
                    console.log('Editor image URL:', url);
                    addImage(url);
                  }
                }}
                onUpload={(result: any) => {
                  console.log('Editor image upload event:', result.event, result);
                  if (result.event === 'success') {
                    addImage(result.info.secure_url);
                  }
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    title="Insert Image"
                    className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-700"
                  >
                    <ImageIcon className="h-4 w-4" />
                  </button>
                )}
              </CldUploadWidget>
            </div>
          )}

          {/* Undo/Redo */}
          <div className="flex gap-1">
            <MenuButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              title="Undo (Ctrl+Z)"
            >
              <Undo className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              title="Redo (Ctrl+Y)"
            >
              <Redo className="h-4 w-4" />
            </MenuButton>
          </div>
        </div>

        {/* Link Input */}
        {showLinkInput && (
          <div className="border-b border-gray-200 bg-gray-50 p-3 flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setLink();
                }
              }}
              className="flex-1"
            />
            <Button type="button" size="sm" onClick={setLink}>
              {t.common.add || 'Add'}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                setShowLinkInput(false);
                setLinkUrl('');
              }}
            >
              {t.common.cancel || 'Cancel'}
            </Button>
          </div>
        )}

        {/* Editor Content */}
        <EditorContent editor={editor} className="min-h-[300px]" />
      </div>

      <p className="text-xs text-gray-500">
        {isCloudinaryAvailable
          ? 'Use the toolbar to format text and insert images'
          : 'Cloudinary not configured - image uploads disabled'}
      </p>
    </div>
  );
}
