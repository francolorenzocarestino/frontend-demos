import Head from 'next/head'
import { CarouselProvider, Slider, Slide, Dot } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import Link from 'next/link'

const ReactCarrouselTestPage = () => {
  const sliders = Array.from({ length: 3 })
  const arrayOfColors = ['bg-red-500', 'bg-green-500', 'bg-blue-500']
  return (
    <>
      <Head>
        <title>React Carrousel Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-cyan-50 justify-evenly flex flex-col items-center w-full h-full">
        <h1 className="text-cyan-700 my-4 text-2xl font-semibold">React Carrousel Test</h1>
        <div className="flex flex-col items-center flex-1 w-full">
          <CarouselProvider
            naturalSlideWidth={500}
            naturalSlideHeight={200}
            totalSlides={sliders.length}
            className="relative w-full h-full"
            interval={1500}
            isPlaying={true}
            infinite={true}
          >
            <Slider>
              {sliders.map((_, index) => (
                <Slide
                  key={index}
                  index={index}
                  className={`w-full h-full text-center ${arrayOfColors[index]}`}
                >
                  <Link href="/">
                    <a className="text-center">Slide {index + 1}</a>
                  </Link>
                </Slide>
              ))}
            </Slider>
            <div className=" absolute bottom-0 flex items-center justify-center w-full gap-4 my-2">
              {sliders.map((_, index) => (
                <Dot
                  key={index}
                  slide={index}
                  className={`bg-transparent disabled:bg-white h-6 w-6 rounded-full border-2 border-transparent disabled:border-slate-800 grid place-content-center my-1`}
                >
                  <div className={`${arrayOfColors[index]} w-4 h-4 rounded-full`} />
                </Dot>
              ))}
            </div>
          </CarouselProvider>
        </div>
      </main>
    </>
  )
}
export default ReactCarrouselTestPage
