"use client"

import { useTranslation } from "@/hooks/use-translation"
import { isLocal } from "@/libs/const"
import { cn } from "@/libs/tw"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { Label } from "./label"

const schema = z.object({
  localMediaDir: z.string().optional(),
  symlinkName: z.string().optional(),
  categoryName: z.string().optional(),
  seekFormat: z.boolean().optional(),
})

type PlaylistManagementFormValues = z.infer<typeof schema>

export function PlaylistManagementForm() {
  const t = useTranslation()
  const {
    control,
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<PlaylistManagementFormValues>({
    resolver: zodResolver(schema),
  })
  const localMediaDir = useWatch({ control, name: "localMediaDir" })
  const symlinkName = useWatch({ control, name: "symlinkName" })
  const categoryName = useWatch({ control, name: "categoryName" })

  const onSubmit = (data: PlaylistManagementFormValues) => {
    console.log(data)
    alert("Not implemented yet!")
  }

  const download = () => {
    alert("Not implemented yet!")
  }

  return (
    <form name="playlistManagement" onSubmit={handleSubmit(onSubmit)}>
      <p className="hidden mb-2 text-gray-500 dark:text-gray-400">
        {t["This section provides various tools to manage your playlists."]}
        <br />
      </p>
      <div className="mb-2 text-gray-500 dark:text-gray-400">
        <div id="playlist-management-field-symbolic-link" className="mb-4">
          <h3
            className={cn(
              "text-base font-semibold mb-2 -mx-5 px-5",
              isLocal
                ? "text-teal-900 dark:text-teal-100 bg-teal-100 dark:bg-teal-950"
                : "text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700"
            )}
          >
            {t["Create Symbolic Link"]}
          </h3>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            {
              t[
                "Create a symbolic link of the folder containing the media files on your host computer into media directory in the Ambient."
              ]
            }
          </p>
          <Label
            id="local-media-directory-label"
            htmlFor="local-media-directory"
            className={cn(
              "block mb-2 text-sm font-medium",
              !errors.localMediaDir && isLocal
                ? "text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-gray-400",
              errors.localMediaDir &&
                isLocal &&
                "text-red-600 dark:text-red-400",
              !errors.localMediaDir &&
                !!localMediaDir &&
                isLocal &&
                "text-green-500 dark:text-green-400"
            )}
            touched={!!localMediaDir}
            required={isLocal}
            error={
              Boolean(errors.localMediaDir) ? t["This path is required"] : ""
            }
          >
            {t["Local Media Folder Path"]}
          </Label>
          <input
            id="local-media-directory"
            type="text"
            className={cn(
              "block w-full text-sm border rounded-lg cursor-pointer focus:outline-none",
              !errors.localMediaDir &&
                "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500",
              errors.localMediaDir &&
                "bg-red-50 dark:bg-gray-700 border-red-500 dark:border-red-500 text-gray-900 dark:text-white placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500",
              !errors.localMediaDir &&
                !!localMediaDir &&
                "bg-green-50 dark:bg-gray-700 border-green-500 dark:border-green-500 text-gray-900 dark:text-white placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500"
            )}
            placeholder="C:/Users/Username/Media/FavoriteFolder"
            required
            disabled={!isLocal}
            {...register("localMediaDir", {
              onBlur: () => trigger("localMediaDir"),
            })}
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            {
              t[
                "Enter the full path to the media folder on the host computer that you want to link to."
              ]
            }
          </p>
        </div>
        <div className="grid gap-4 mb-8 md:grid-cols-2">
          <div>
            <Label
              id="symlink-name-label"
              htmlFor="symlink-name"
              className={cn(
                "block mb-2 text-sm font-medium",
                !errors.symlinkName && isLocal
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400",
                errors.symlinkName &&
                  isLocal &&
                  "text-red-600 dark:text-red-400",
                !errors.symlinkName &&
                  !!symlinkName &&
                  isLocal &&
                  "text-green-500 dark:text-green-400"
              )}
              touched={!!symlinkName}
              required={isLocal}
              error={
                Boolean(errors.symlinkName) ? t["This name is required"] : ""
              }
            >
              {t["Symbolic Link Name"]}
            </Label>
            <input
              id="symlink-name"
              type="text"
              className={cn(
                "block w-full text-sm border rounded-lg cursor-pointer focus:outline-none",
                !errors.symlinkName &&
                  "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500",
                errors.symlinkName &&
                  "bg-red-50 dark:bg-gray-700 border-red-500 dark:border-red-500 text-gray-900 dark:text-white placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500",
                !errors.symlinkName &&
                  !!symlinkName &&
                  "bg-green-50 dark:bg-gray-700 border-green-500 dark:border-green-500 text-gray-900 dark:text-white placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500"
              )}
              placeholder={t["Please fill any strings"]}
              required
              disabled={!isLocal}
              {...register("symlinkName", {
                onBlur: () => trigger("symlinkName"),
              })}
            />
          </div>
          <div className="flex justify-end items-end">
            <button
              id="btn-create-symlink"
              type="submit"
              name="create_symlink"
              className="text-center font-medium rounded-lg text-sm px-5 py-2.5 mr-0 mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              disabled={
                !isLocal ||
                Boolean(errors.localMediaDir) ||
                Boolean(errors.symlinkName)
              }
            >
              {t["Create Symbolic Link"]}
            </button>
          </div>
        </div>
        <div id="playlist-management-field-category" className="mb-8">
          <h3 className="text-base font-semibold mb-2 -mx-5 px-5 text-teal-900 dark:text-teal-100 bg-teal-100 dark:bg-teal-950">
            {t["Add New Category"]}
          </h3>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            {t["Adds a new category to the currently active playlist."]}
          </p>
          <div className="grid gap-4 mb-4 md:grid-cols-2">
            <div>
              <Label
                id="category-name-label"
                htmlFor="category-name"
                className={cn(
                  "block mb-2 text-sm font-medium",
                  !errors.categoryName && "text-gray-900 dark:text-white",
                  errors.categoryName && "text-red-600 dark:text-red-400",
                  !errors.categoryName &&
                    !!categoryName &&
                    "text-green-500 dark:text-green-400"
                )}
                touched={!!categoryName}
                required
                error={
                  Boolean(errors.categoryName) ? t["This name is required"] : ""
                }
              >
                {t["Category Name"]}
              </Label>
              <input
                id="category-name"
                type="text"
                className={cn(
                  "block w-full text-sm border rounded-lg cursor-pointer focus:outline-none",
                  !errors.categoryName &&
                    "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500",
                  errors.categoryName &&
                    "bg-red-50 dark:bg-gray-700 border-red-500 dark:border-red-500 text-gray-900 dark:text-white placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500",
                  !errors.categoryName &&
                    !!categoryName &&
                    "bg-green-50 dark:bg-gray-700 border-green-500 dark:border-green-500 text-gray-900 dark:text-white placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500"
                )}
                placeholder={t["Please fill any strings"]}
                required
                {...register("categoryName")}
              />
            </div>
            <div className="flex justify-end items-end">
              <button
                id="btn-create-category"
                type="submit"
                name="create_category"
                className="text-center font-medium rounded-lg text-sm px-5 py-2.5 mr-0 mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                disabled={!isLocal || Boolean(errors.categoryName)}
              >
                {t["Add Category"]}
              </button>
            </div>
          </div>
        </div>
        <div id="playlist-management-field-download" className="mb-4">
          <h3 className="text-base font-semibold mb-2 -mx-5 px-5 text-teal-900 dark:text-teal-100 bg-teal-100 dark:bg-teal-950">
            {t["Download Playlist"]}
          </h3>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            {t["Download the currently active playlist in JSON format."]}
          </p>
          <div className="flex mb-4">
            <div className="flex items-center h-5">
              <input
                id="seek-format"
                aria-describedby="helper-seek-format"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                {...register("seekFormat")}
              />
            </div>
            <div className="ms-2 text-sm">
              <label
                htmlFor="seek-format"
                className="font-medium text-gray-900 dark:text-gray-300"
              >
                {t["Output seek time in media data in HH:MM:SS format."]}
              </label>
              <p
                id="helper-seek-format"
                className="text-xs font-normal text-gray-500 dark:text-gray-400"
              >
                {
                  t[
                    "If this option is not enabled, it will be output as an integer number of seconds."
                  ]
                }
              </p>
            </div>
          </div>
          <div className="flex justify-end items-end">
            <button
              id="btn-download-playlist"
              type="button"
              name="download_playlist"
              className="text-center font-medium rounded-lg text-sm px-5 py-2.5 mr-0 mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={download}
            >
              {t["Download Playlist"]}
            </button>
          </div>
        </div>
      </div>
      <div
        className="hidden p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
        role="alert"
      >
        <span className="font-medium">
          Sorry, this is currently under development.
        </span>
      </div>
    </form>
  )
}
