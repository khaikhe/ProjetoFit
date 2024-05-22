"use client";

import React from "react";
import { ErrorMessage, Field } from "formik";

export default function Input({ name, label, type, required, ...props }) {
    return (
        <div className="flex flex-col mb-4">
            <label className="capitalize mb-1">
                {label || name} {required && <span className="text-red-600">*</span>}
            </label>
            <Field
                name={name}
                type={type}
                {...props}
                className="p-2 border border-zinc-300 focus:border-blue-500"
            />
            <div className="text-red-500 text-xs mt-1">
                <ErrorMessage name={name} />
            </div>
        </div>
    );
}
