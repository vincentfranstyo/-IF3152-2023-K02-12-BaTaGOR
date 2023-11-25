"use client";
import React, {useState} from 'react';
import {field} from '@/types/models'
import {PrismaClient} from '@prisma/client';
import Link from "next/link"

const prisma = new PrismaClient();

interface FieldEditProps {
    field: field;
}

const excludedKeys = ['owner_id', 'field_name', 'field_id']

const FieldEdit: React.FC<FieldEditProps> = ({field: field}) => {
    const renderFormFields = () => {
        return Object.keys(field).filter((key) => !excludedKeys.includes(key)).map((key, value) => (
            <div key={`${field.field_id}`}
                 id={`${key}`}
                 className={"flex flex-col gap-2 text-[18px]"}>
                <label
                    className={"font-semibold"}
                    htmlFor={`${key}`}
                >
                    {key.charAt(0).toUpperCase() + key.slice(1)}: </label>
                <input
                    id={`${key}`}
                    placeholder={`${String(field[key])}`}
                    className={"px-3 rounded"}
                    name={`${key}`}
                ></input>
            </div>
        ));
    };
    return (
        <>
            <div id="Field Edit" className="max-w-[1200px] mt-3 flex flex-col gap-5 mb-5">
                <form
                    id="Field Edit"
                    className={"max-w-[1200px] mt-3 flex flex-col gap-5 mb-5"}
                >
                    {/*    TODO: TAMBAHIN ONsubmit*/}
                    <div
                        id={"FieldName"}
                        className={"flex flex-col gap-2 text-[24px]"}
                    >
                        <label
                            className={"font-bold"}
                            htmlFor={"field_name"}
                        >
                            Field Name: </label>
                        <input
                            id={"field_name"}
                            placeholder={`${field.field_name}`}
                            className={"px-3 rounded"}
                            name={"field_name"}
                            required
                        ></input>
                    </div>
                    {renderFormFields()}
                    <button
                        type={"submit"}>
                        <Link
                            href={`/pages/FieldInfo/${field.field_id}`}
                            className={"h-auto rounded bg-green-300" +
                                " text-black" +
                                " hover:text-white hover:bg-green-500 mx-auto px-3 py-1 w-[10%] text-center font-bold"}>
                            Save
                        </Link>
                    </button>
                </form>
            </div>
        </>
    );
}

export default FieldEdit;