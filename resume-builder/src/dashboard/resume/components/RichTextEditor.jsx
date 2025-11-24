import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import {
  BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList,
  BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar
} from 'react-simple-wysiwyg'; // Import various toolbar buttons and editor components from the 'react-simple-wysiwyg' rich text editor library

import { toast } from 'sonner';//for now not used in code


function RichTextEditor({ onChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue || ""); // Local state to hold the current editor content, initialized to defaultValue or empty string if not provided
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  

  return (
    <div>
      
    
      <EditorProvider>  {/*EditorProvider that manages internal states such as toolbar button states.*/}
        <Editor
          value={value}  // // The content displayed in the editor is controlled by the 'value' state variable.
          onChange={e => {
            setValue(e.target.value); // // When the user types or edits inside the editor, this updates the 'value' state to match the input content.This keeps the React 'value' state in sync with what the user sees and types.
            onChange && onChange(e);// If an external 'onChange' callback prop is provided, it calls that as well. This allows parent components to listen to and respond to changes in the editor.

          }}
          toolbar={
            <Toolbar> {/* Toolbar with multiple formatting buttons for rich-text editing */}
              <BtnStyles />
              <Separator />
              <BtnBold />
              <BtnItalic />
              <BtnUnderline />
              <BtnStrikeThrough />
              <Separator />
              <BtnBulletList />
              <BtnNumberedList />
              <Separator />
              <BtnLink />
              <BtnClearFormatting />
              <HtmlButton />
            </Toolbar>
          }
        />
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
