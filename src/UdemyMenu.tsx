import React, { useState } from 'react';
import './UdemyMenu.scss';
import UpArrow from './icons/UpArrow.jsx';
import DownArrow from './icons/DownArrow.jsx';

import { Checkbox } from "antd";

interface Section {
    title: string;
    items: { name: string; completed: boolean }[];
}

const sectionsData: Section[] = [
    {
        title: 'Section 1: Chapter 1',
        items: [
            { name: 'Item 1', completed: true },
            { name: 'Item 2', completed: true },
            { name: 'Item 3', completed: false },
            { name: 'Item 4', completed: false },
        ],
    },
    {
        title: 'Section 2: Chapter 2',
        items: [
            { name: 'Item 1', completed: true },
            { name: 'Item 2', completed: true },
            { name: 'Item 3', completed: false },
        ],
    },
    {
        title: 'Section 3: Chapter 3',
        items: [
            { name: 'Item 1', completed: false },
            { name: 'Item 2', completed: false },
            { name: 'Item 3', completed: false },
        ],
    },
    {
        title: 'Section 3: Chapter 4',
        items: [
            { name: 'Item 1', completed: true },
            { name: 'Item 2', completed: true },
            { name: 'Item 3', completed: false },
            { name: 'Item 4', completed: false },
        ],
    },
    {
        title: 'Section 4: Chapter 4',
        items: [
            { name: 'Item 1', completed: true },
            { name: 'Item 2', completed: true },
            { name: 'Item 3', completed: false },
        ],
    },
    {
        title: 'Section 5: Chapter 5',
        items: [
            { name: 'Item 1', completed: false },
            { name: 'Item 2', completed: false },
            { name: 'Item 3', completed: false },
        ],
    },
    {
        title: 'Section 6: Chapter 6',
        items: [
            { name: 'Item 1', completed: true },
            { name: 'Item 2', completed: true },
            { name: 'Item 3', completed: false },
            { name: 'Item 4', completed: false },
        ],
    },
    {
        title: 'Section 7: Chapter 7',
        items: [
            { name: 'Item 1', completed: true },
            { name: 'Item 2', completed: true },
            { name: 'Item 3', completed: false },
        ],
    },
    {
        title: 'Section 8: Chapter 8',
        items: [
            { name: 'Item 1', completed: false },
            { name: 'Item 2', completed: false },
            { name: 'Item 3', completed: false },
        ],
    },
];

const handleCheckboxClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Chặn sự kiện nổi bọt
};

// Định nghĩa kiểu của props
interface UdemyMenuProps {
    handleClick: (event: React.MouseEvent<HTMLElement>, id: number) => void;
}


const UdemyMenu: React.FC<UdemyMenuProps> = ({ handleClick }) => {
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

    const toggleSection = (event: React.MouseEvent<HTMLElement>, index: number) => {
        setOpenSections((prevState) => {
            if (!prevState[index]) {
                handleClick(event, 1);
            }
            return {
                ...prevState,
                [index]: !prevState[index],
            }
        });
    };

    return (
        <>
            {sectionsData.map((section, index) => (
                <div className="section" key={index}>
                    <h4
                        onClick={(e) => {
                            toggleSection(e, index);
                        }}
                        className='section-title'
                    >
                        {section.title}
                        <span>{openSections[index] ? <UpArrow /> : <DownArrow />}</span>
                    </h4>
                    {openSections[index] && (
                        <div className="items">
                            {section.items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`item`}
                                    onClick={(e) => handleClick(e, 2)}
                                >
                                    <input
                                        type="checkbox"
                                        id={`checkbox-${index.toString()}-${idx.toString()}`} className="item-checkbox"
                                        onClick={(e) => handleCheckboxClick(e)}
                                    />
                                    <label
                                        htmlFor={`checkbox-${index.toString()}-${idx.toString()}`} className="custom-label"
                                        onClick={(e) => handleCheckboxClick(e)}
                                    >
                                    </label>
                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </>
    );
};

export default UdemyMenu;

