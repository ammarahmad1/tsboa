import React from 'react';
import blogwriter1 from './Images/blog1.jpg';
import blogwriter2 from './Images/blog2.jpg';
import blogwriter3 from './Images/blog3.jpg';

const Articles = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div>
          <div className="max-w-[1216px] min-h-[124px]  mx-auto">
            <div className="max-w-[768px] min-h-[124px] gap-5 mx-auto flex flex-col items-center">
              <h2 className="text-3xl font-semibold">Useful Articles</h2>
              <p className="text-xl min-h-0 font-normal text-center">
                The latest news, technologies, and resources from our team.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* Blog Card 1 */}
          <article className="flex max-w-xl flex-col items-start justify-between">
            <div className="flex items-center gap-x-4 text-xs">
              <time className="text-gray-500">Mar 16, 2020</time>
              <a href="#" className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                Marketing
              </a>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a href="#">
                  <span className="absolute inset-0"></span>
                  Rhoncus rutrum ac volutpat
                </a>
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">Vitae rhoncus tristique ac enim volutpat vivamus lacus eu. Sed.</p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
              <img
                src={blogwriter1}
                alt=""
                className="h-10 w-10 rounded-full bg-gray-50"
              />
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    Michael Foster
                  </a>
                </p>
                <p className="text-gray-600">Co-Founder / CTO</p>
              </div>
            </div>
          </article>

          {/* Blog Card 2 */}
          <article className="flex max-w-xl flex-col items-start justify-between">
            <div className="flex items-center gap-x-4 text-xs">
              <time className="text-gray-500">Mar 16, 2020</time>
              <a href="#" className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                Marketing
              </a>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a href="#">
                  <span className="absolute inset-0"></span>
                  Rhoncus rutrum ac volutpat
                </a>
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">Vitae rhoncus tristique ac enim volutpat vivamus lacus eu. Sed.</p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
              <img
                src={blogwriter2}
                alt=""
                className="h-10 w-10 rounded-full bg-gray-50"
              />
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    Michael Foster
                  </a>
                </p>
                <p className="text-gray-600">Co-Founder / CTO</p>
              </div>
            </div>
          </article>
          {/* Blog Card 3 */}
          <article className="flex max-w-xl flex-col items-start justify-between">
            <div className="flex items-center gap-x-4 text-xs">
              <time className="text-gray-500">Mar 16, 2020</time>
              <a href="#" className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                Marketing
              </a>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a href="#">
                  <span className="absolute inset-0"></span>
                  Rhoncus rutrum ac volutpat
                </a>
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">Vitae rhoncus tristique ac enim volutpat vivamus lacus eu. Sed.</p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
              <img
                src={blogwriter3}
                alt=""
                className="h-10 w-10 rounded-full bg-gray-50"
              />
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    Michael Foster
                  </a>
                </p>
                <p className="text-gray-600">Co-Founder / CTO</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Articles;
