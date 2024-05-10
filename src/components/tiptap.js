"use client"
import '@/components/tiptapstyle.css'

import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import {EditorContent, EditorProvider, useCurrentEditor, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from "@tiptap/extension-underline"
import { Bars3BottomLeftIcon, Bars3BottomRightIcon, MinusIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Link from "@tiptap/extension-link"
import CharacterCount from "@tiptap/extension-character-count"
import TextAlign from "@tiptap/extension-text-align"
import { useState } from "react";
import {Button} from "@/components/ui/button";

const MenuBar = () => {
    const { editor } = useCurrentEditor()
    const [valueLink, setValueLink] = useState("")
    const [valueVideoLink, setValueVideoLink] = useState("")
    const [selectedOption, setSelectedOption] = useState(new Set(["h1"]));

    const descriptionsMap = {
        h1: (
            <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="currentColor" className="bi bi-type-h1" viewBox="0 0 16 16">
                <path d="M7.648 13V3H6.3v4.234H1.348V3H0v10h1.348V8.421H6.3V13zM14 13V3h-1.333l-2.381 1.766V6.12L12.6 4.443h.066V13z"/>
            </svg>
        ),
        h2: ( <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="currentColor" className="bi bi-type-h2" viewBox="0 0 16 16">
            <path d="M7.495 13V3.201H6.174v4.15H1.32V3.2H0V13h1.32V8.513h4.854V13zm3.174-7.071v-.05c0-.934.66-1.752 1.801-1.752 1.005 0 1.76.639 1.76 1.651 0 .898-.582 1.58-1.12 2.19l-3.69 4.2V13h6.331v-1.149h-4.458v-.079L13.9 8.786c.919-1.048 1.666-1.874 1.666-3.101C15.565 4.149 14.35 3 12.499 3 10.46 3 9.384 4.393 9.384 5.879v.05z"/>
        </svg>),
        h3: (<svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="currentColor" className="bi bi-type-h3" viewBox="0 0 16 16">
            <path d="M11.07 8.4h1.049c1.174 0 1.99.69 2.004 1.724s-.802 1.786-2.068 1.779c-1.11-.007-1.905-.605-1.99-1.357h-1.21C8.926 11.91 10.116 13 12.028 13c1.99 0 3.439-1.188 3.404-2.87-.028-1.553-1.287-2.221-2.096-2.313v-.07c.724-.127 1.814-.935 1.772-2.293-.035-1.392-1.21-2.468-3.038-2.454-1.927.007-2.94 1.196-2.981 2.426h1.23c.064-.71.732-1.336 1.744-1.336 1.027 0 1.744.64 1.744 1.568.007.95-.738 1.639-1.744 1.639h-.991V8.4ZM7.495 13V3.201H6.174v4.15H1.32V3.2H0V13h1.32V8.513h4.854V13z"/>
        </svg>),
        h4: (<svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="currentColor" className="bi bi-type-h4" viewBox="0 0 16 16">
            <path d="M13.007 3H15v10h-1.29v-2.051H8.854v-1.18C10.1 7.513 11.586 5.256 13.007 3m-2.82 6.777h3.524v-5.62h-.074a95 95 0 0 0-3.45 5.554zM7.495 13V3.201H6.174v4.15H1.32V3.2H0V13h1.32V8.513h4.854V13z"/>
        </svg>),
        h5: ( <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="currentColor" className="bi bi-type-h5" viewBox="0 0 16 16">
            <path d="M9 10.516h1.264c.193.976 1.112 1.364 2.01 1.364 1.005 0 2.067-.782 2.067-2.247 0-1.292-.983-2.082-2.089-2.082-1.012 0-1.658.596-1.924 1.077h-1.12L9.646 3h5.535v1.141h-4.415L10.5 7.28h.072c.201-.316.883-.84 1.967-.84 1.709 0 3.13 1.177 3.13 3.158 0 2.025-1.407 3.403-3.475 3.403-1.809 0-3.1-1.048-3.194-2.484ZM7.495 13V3.201H6.174v4.15H1.32V3.2H0V13h1.32V8.512h4.854V13z"/>
        </svg>),
        h6: (<svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="currentColor" className="bi bi-type-h6" viewBox="0 0 16 16">
            <path d="M15.596 5.178H14.3c-.106-.444-.62-1.072-1.706-1.072-1.332 0-2.325 1.269-2.325 3.947h.07c.268-.67 1.043-1.445 2.445-1.445 1.494 0 3.017 1.064 3.017 3.073C15.8 11.795 14.37 13 12.48 13c-1.036 0-2.093-.36-2.77-1.452C9.276 10.836 9 9.808 9 8.37 9 4.656 10.494 3 12.636 3c1.812 0 2.883 1.113 2.96 2.178m-5.151 4.566c0 1.367.944 2.15 2.043 2.15 1.128 0 2.037-.684 2.037-2.136 0-1.41-1-2.065-2.03-2.065-1.19 0-2.05.853-2.05 2.051M7.495 13V3.201H6.174v4.15H1.32V3.2H0V13h1.32V8.513h4.854V13z"/>
        </svg>),
    };

    // Convert the Set to an Array and get the first value.
    const selectedOptionValue = Array.from(selectedOption)[0];

    if (!editor) {
        return null
    }

    return (
        <div className="flex gap-2">
            <div className="flex gap-1 flex-wrap justify-center w-full">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleBold()
                                .run()
                        }
                        className={editor.isActive('bold') ? 'bg-[#27272a]' : ''}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="70%" height="70%" fill="currentColor" className="bi bi-type-bold" viewBox="0 0 16 16">
                            <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
                        </svg>
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleBold()
                                .run()
                        }
                        className={editor.isActive('underline') ? 'bg-[#27272a]' : ''}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="70%" height="70%" fill="currentColor" className="bi bi-type-underline" viewBox="0 0 16 16">
                            <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57s-2.687-1.08-2.687-2.57zM12.5 15h-9v-1h9z"/>
                        </svg>
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleItalic()
                                .run()
                        }
                        className={editor.isActive('italic') ? 'bg-[#27272a]' : ''}
                    >
                        <svg width="70%" height="70%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 4H10M14 20H5M15 4L9 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleStrike()
                                .run()
                        }
                        className={editor.isActive('strike') ? 'bg-[#27272a]' : ''}
                    >
                        <svg width="70%" height="70%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 16C6 18.2091 7.79086 20 10 20H14C16.2091 20 18 18.2091 18 16C18 13.7909 16.2091 12 14 12M18 8C18 5.79086 16.2091 4 14 4H10C7.79086 4 6 5.79086 6 8M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Button>
                    <Button size="icon"
                            variant="ghost"onClick={() => {
                        editor.chain().focus().unsetAllMarks().run();
                        editor.chain().focus().clearNodes().run();
                    }}>
                        <svg width="70%" height="70%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.9995 13L10.9995 6.00004M20.9995 21H7.99955M10.9368 20.0628L19.6054 11.3941C20.7935 10.2061 21.3875 9.61207 21.6101 8.92709C21.8058 8.32456 21.8058 7.67551 21.6101 7.07298C21.3875 6.388 20.7935 5.79397 19.6054 4.60592L19.3937 4.39415C18.2056 3.2061 17.6116 2.61207 16.9266 2.38951C16.3241 2.19373 15.675 2.19373 15.0725 2.38951C14.3875 2.61207 13.7935 3.2061 12.6054 4.39415L4.39366 12.6059C3.20561 13.794 2.61158 14.388 2.38902 15.073C2.19324 15.6755 2.19324 16.3246 2.38902 16.9271C2.61158 17.6121 3.20561 18.2061 4.39366 19.3941L5.06229 20.0628C5.40819 20.4087 5.58114 20.5816 5.78298 20.7053C5.96192 20.815 6.15701 20.8958 6.36108 20.9448C6.59126 21 6.83585 21 7.32503 21H8.67406C9.16324 21 9.40784 21 9.63801 20.9448C9.84208 20.8958 10.0372 20.815 10.2161 20.7053C10.418 20.5816 10.5909 20.4087 10.9368 20.0628Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'bg-[#27272a]' : ''}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="70%" height="70%" fill="currentColor" className="bi bi-paragraph" viewBox="0 0 16 16">
                        <path d="M10.5 15a.5.5 0 0 1-.5-.5V2H9v12.5a.5.5 0 0 1-1 0V9H7a4 4 0 1 1 0-8h5.5a.5.5 0 0 1 0 1H11v12.5a.5.5 0 0 1-.5.5"/>
                    </svg>
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'bg-[#27272a]' : ''}
                >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="currentColor" className="bi bi-type-h1" viewBox="0 0 16 16"><path d="M7.648 13V3H6.3v4.234H1.348V3H0v10h1.348V8.421H6.3V13zM14 13V3h-1.333l-2.381 1.766V6.12L12.6 4.443h.066V13z"/></svg>
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'bg-[#27272a]' : ''}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="currentColor" className="bi bi-type-h2" viewBox="0 0 16 16"><path d="M7.495 13V3.201H6.174v4.15H1.32V3.2H0V13h1.32V8.513h4.854V13zm3.174-7.071v-.05c0-.934.66-1.752 1.801-1.752 1.005 0 1.76.639 1.76 1.651 0 .898-.582 1.58-1.12 2.19l-3.69 4.2V13h6.331v-1.149h-4.458v-.079L13.9 8.786c.919-1.048 1.666-1.874 1.666-3.101C15.565 4.149 14.35 3 12.499 3 10.46 3 9.384 4.393 9.384 5.879v.05z"/></svg>
                </Button>
                    <Button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'bg-[#27272a]' : ''}
                        size="icon"
                        variant="ghost"
                    >
                        <svg width="70%" height="70%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'bg-[#27272a]' : ''}
                        size="icon"
                        variant="ghost"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="70%" height="70%" fill="currentColor" className="bi bi-list-ol" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
                            <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635z"/>
                        </svg>
                    </Button>
                <Button size="icon"
                        variant="ghost"onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                    <MinusIcon className="w-[28px] h-[29px]" />
                </Button>
                <Button size="icon"
                        variant="ghost"onClick={() => editor.chain().focus().setHardBreak().run()}>
                    <svg width="70%" height="70%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H21M3 12H18C18.7956 12 19.5587 12.3161 20.1213 12.8787C20.6839 13.4413 21 14.2044 21 15C21 15.7956 20.6839 16.5587 20.1213 17.1213C19.5587 17.6839 18.7956 18 18 18H14M14 18L16 16M14 18L16 20M3 18H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Button>
                    <Button
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={`${editor.isActive({ textAlign: 'left' }) ? 'bg-[#27272a]' : ''}`}
                        size="icon"
                        variant="ghost"
                    >
                        <Bars3BottomLeftIcon className="w-[28px] h-[28px]"/>
                    </Button><Button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`${editor.isActive({ textAlign: 'center' }) ? 'bg-[#27272a]' : ''}`}
                    size="icon"
                    variant="ghost"
                >
                    <Bars3Icon className="w-[28px] h-[28px]"/>
                </Button>
                    <Button
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={`${editor.isActive({ textAlign: 'right' }) ? 'bg-[#27272a]' : ''}`}
                        size="icon"
                        variant="ghost"
                    >
                        <Bars3BottomRightIcon className="w-[28px] h-[28px]"/>
                    </Button>

            </div>
        </div>
    )
}





const TipTap = ({ setTextState, textState, limit=null }) => {
    let content = ``
    if (textState) {
        content = textState
    }
    const extensions = [
        TextStyle.configure({ types: [ListItem.name] }),
        Underline.configure(),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
            alignments: ['left', 'center', 'right'],
        }),
        CharacterCount.configure({
            limit: limit
        }),
        StarterKit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false,
            },
            orderedList: {
                keepMarks: true,
                keepAttributes: false,
            },
        }),
        Link.configure({
            HTMLAttributes: {
                target: '_blank',
            },
        }),
    ];

    const handleUpdate = ({ editor }) => {
        const html = editor.getHTML();
        setTextState(html);
    };
    return (
        <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content} onUpdate={handleUpdate}></EditorProvider>
    )
}
export default TipTap