const FirstPage = ({
  currentPage,
  imageUrl,
  formData,
  handleChange,
  handleUploadSuccess,
}) => {
  return (
    <div className="modal-container flex flex-col xl:space-x-8 xl:flex-row max-h-screen overflow-y-auto">
      <div className="left-side flex-col items-center flex-1 justify-center max-h-screen overflow-y-auto">
        <div className="flex flex-col w-full items-center justify-center mb-4 space-y-4  max-h-[800px] overflow-auto">
          <h3 className="text-xl font-medium text-white text-left w-full">
            {currentPage === 0 ? "Image Preview" : "Page Title"}{" "}
            {/* Change "Page Title" to the actual title */}
          </h3>
          <div>
            {currentPage === 0 ? (
              <>
                {imageUrl ? (
                  <CldImage
                    src={imageUrl}
                    width="1200"
                    height="1200"
                    alt="Uploaded"
                  />
                ) : (
                  <div
                    role="status"
                    className="flex items-center w-[700px] justify-center h-56 bg-gray-300 rounded-lg overflow-hidden"
                  >
                    {/* Placeholder image or any other content */}
                    <svg
                      className="w-36 h-36 text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                )}
              </>
            ) : (
              <> {/* Placeholder for other content on non-image pages */}</>
            )}
          </div>
          {currentPage === 0 && !imageUrl && (
            <CldUploadButton
              uploadPreset="nh1i8otq"
              onSuccess={handleUploadSuccess}
              className="orange_btn w-full h-12"
              onUploadAdded={(result) => {
                console.log(result);
                // Handle image upload
              }}
            />
          )}
        </div>
      </div>
      <div className="right-side min-w-1/2 flex-1 grid gap-4 mb-4 ">
        <div className="col-span-1 w-full overflow-y-auto max-h-[450px] pl-4">
          <h3 className="text-xl font-medium text-white mb-2">Program Form</h3>
          {currentPage === 0 && (
            <div className="space-y-4 mb-4">
              <TextInput
                id="title"
                name="title"
                placeholder="Title"
                type="text"
                onChange={handleChange}
                required={true}
                value={formData.title}
                sizing="md"
              />
              <Textarea
                id="description"
                name="description"
                placeholder="Description"
                type="text"
                onChange={handleChange}
                required={true}
                value={formData.description}
                rows={11}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
