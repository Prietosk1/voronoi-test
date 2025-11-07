import { PlayIcon, TrashIcon, SparklesIcon } from "@heroicons/react/24/solid";

export default function Button({
  onAnimate,
  onRandom,
  onClear,
}: {
  onAnimate: () => void;
  onRandom: () => void;
  onClear: () => void;
}) {
  return (
    <div className="fixed top-4 right-4 flex gap-2 z-50">
      {/* Botón Animar */}
      <button
        onClick={onAnimate}
        className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        <PlayIcon className="w-5 h-5" />
        <span className="hidden md:inline">Animar Voronoi</span>
      </button>

      {/* Botón Random */}
      <button
        onClick={onRandom}
        className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        <SparklesIcon className="w-5 h-5" />
        <span className="hidden md:inline">Random</span>
      </button>

      {/* Botón Limpiar */}
      <button
        onClick={onClear}
        className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        <TrashIcon className="w-5 h-5" />
        <span className="hidden md:inline">Limpiar</span>
      </button>
    </div>
  );
}
