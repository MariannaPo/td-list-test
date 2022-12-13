import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('');
    let activeEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    }
    let activeViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (
        editMode ? <input value={title} onChange={onChangeTitleHandler} onBlur={activeViewMode} autoFocus/> :
            <span onDoubleClick={activeEditMode}>{props.title}</span>
    )
}