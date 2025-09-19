import Image from "next/image";
import React from "react";
import img1 from "../../../public/assets/Logo_design.jpg";
import img2 from "../../../public/assets/Logo_design.jpg";
import img3 from "../../../public/assets/Logo_design.jpg";
import img4 from "../../../public/assets/Logo_design.jpg";

export default function ExploreSkills() {
  return (
    <div>
      <h2 className="text-3xl text-center font-bold py-4">Explore Skills</h2>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card bg-base-100 shadow-sm">
            <figure>
              <Image
                src={img1}
                alt="Picture of the author"
                width={500}
                height={500}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Photography</h2>
              <p>
                Capture stunning moments with the art of lighting, framing, and
                editing.
              </p>
              <div className="card-actions justify-start">
                <button className="btn btn-neutral">Learn More</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm">
            <figure>
              <Image
                src={img2}
                alt="Picture of the author"
                width={500}
                height={500}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Videography</h2>
              <p>
                Learn storytelling through videos — from shooting to
                post-production.
              </p>
              <div className="card-actions justify-start">
                <button className="btn btn-neutral">Learn More</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm">
            <figure>
              <Image
                src={img3}
                alt="Picture of the author"
                width={500}
                height={500}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">SEO</h2>
              <p>
                Boost website visibility and drive organic traffic with proven
                strategies.
              </p>
              <div className="card-actions justify-start">
                <button className="btn btn-neutral">Learn More</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm">
            <figure>
              <Image
                src={img4}
                alt="Picture of the author"
                width={500}
                height={500}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Graphic Design</h2>
              <p>
                Create visual content that communicates ideas with style and
                impact.
              </p>
              <div className="card-actions justify-start">
                <button className="btn btn-neutral">Learn More</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm">
            <figure>
              <Image
                src={img4}
                alt="Picture of the author"
                width={500}
                height={500}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Logo Design</h2>
              <p>
                Craft memorable brand identities with unique and creative logos.
              </p>
              <div className="card-actions justify-start">
                <button className="btn btn-neutral">Learn More</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm">
            <figure>
              <Image
                src={img4}
                alt="Picture of the author"
                width={500}
                height={500}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Web Development</h2>
              <p>
                Build dynamic websites using HTML, CSS, JavaScript, and modern
                frameworks.
              </p>
              <div className="card-actions justify-start">
                <button className="btn btn-neutral">Learn More</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm">
            <figure>
              <Image
                src={img4}
                alt="Picture of the author"
                width={500}
                height={500}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Ethical Hacking</h2>
              <p>
                Learn security testing skills to protect systems from cyber
                threats.
              </p>
              <div className="card-actions justify-start">
                <button className="btn btn-neutral">Learn More</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm">
            <figure>
              <Image
                src={img4}
                alt="Picture of the author"
                width={500}
                height={500}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Data Analysis</h2>
              <p>
                Interpret and visualize data to make smarter, data-driven
                decisions.
              </p>
              <div className="card-actions justify-start">
                <button className="btn btn-neutral">Learn More</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm">
            <figure>
              <Image
                src={img4}
                alt="Picture of the author"
                width={500}
                height={500}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Journalism</h2>
              <p>
                Master the art of reporting, writing, and delivering powerful
                stories.
              </p>
              <div className="card-actions justify-start">
                <button className="btn btn-neutral">Learn More</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm">
            <figure>
              <Image
                src={img4}
                alt="Picture of the author"
                width={500}
                height={500}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Machine Learning</h2>
              <p>
                Explore AI by training models to recognize patterns and make
                predictions.
              </p>
              <div className="card-actions justify-start">
                <button className="btn btn-neutral">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
