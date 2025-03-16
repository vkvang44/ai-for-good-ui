export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="mt-24 px-4 max-w-6xl mx-auto grid grid-cols-3 gap-8 mb-24"
    >
      <div id="feature-1" className="text-center">
        <i
          className="text-[#FF6B6B] text-3xl mb-4 flex justify-center"
          data-fa-i2svg=""
        >
          <svg
            className="svg-inline--fa fa-bolt size-8"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="bolt"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            data-fa-i2svg=""
          >
            <path
              fill="currentColor"
              d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z"
            ></path>
          </svg>
        </i>
        <h3 className="text-xl font-semibold mb-2">Instant Analysis</h3>
        <p className="text-gray-600">Get comprehensive feedback in seconds</p>
      </div>
      <div id="feature-2" className="text-center">
        <i
          className="text-[#26B4A1] text-3xl  mb-4 flex justify-center"
          data-fa-i2svg=""
        >
          <svg
            className="svg-inline--fa fa-chart-column size-8"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="chart-column"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            data-fa-i2svg=""
          >
            <path
              fill="currentColor"
              d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zM160 224c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm128-64V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm64 32c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32zM480 96V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V96c0-17.7 14.3-32 32-32s32 14.3 32 32z"
            ></path>
          </svg>
        </i>
        <h3 className="text-xl font-semibold mb-2">Detailed Scoring</h3>
        <p className="text-gray-600">Review scores across 6 key criteria</p>
      </div>
      <div id="feature-3" className="text-center">
        <i
          className="text-[#FFB946] text-3xl mb-4 flex justify-center"
          data-fa-i2svg=""
        >
          <svg
            className="svg-inline--fa fa-file-export size-8"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="file-export"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            data-fa-i2svg=""
          >
            <path
              fill="currentColor"
              d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V288H216c-13.3 0-24 10.7-24 24s10.7 24 24 24H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM384 336V288H494.1l-39-39c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H384zm0-208H256V0L384 128z"
            ></path>
          </svg>
        </i>
        <h3 className="text-xl font-semibold mb-2">Export Reports</h3>
        <p className="text-gray-600">Save and share detailed feedback</p>
      </div>
    </section>
  );
}
