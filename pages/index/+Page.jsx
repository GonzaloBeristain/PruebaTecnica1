export { Page }

import { Link } from "../../renderer/Link"

function Page() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 h-[calc(100vh-3rem)]">
      <h1 className="text-white text-5xl">Mini Proyecto</h1>
      <p className="text-slate-300 text-2xl">Postulante: Gonzalo Beristain</p>
      <section className="flex gap-x-2">
        <Link href="https://github.com/GonzaloBeristain" className="text-slate-400 hover:text-slate-600 transition-colors duration-300">GitHub</Link>
        <p className="text-slate-400">-</p>
        <Link href="https://www.gberistaindev.cl" className="text-slate-400 hover:text-slate-600 transition-colors duration-300">Portafolio</Link>
        <p className="text-slate-400">-</p>
        <Link href="mailto:ga_beristainn@hotmail.com" className="text-slate-400 hover:text-slate-600 transition-colors duration-300">Email</Link>
      </section>
      
    </div>
  )
};