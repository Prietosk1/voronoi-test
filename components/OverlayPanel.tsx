import {
  PlayIcon,
  TrashIcon,
  SparklesIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
export default function OverlayPanel({
  onAnimate,
  onRandom,
  onClear,
  onToggleColor,
  coloredMode,
}: {
  onAnimate: () => void;
  onRandom: () => void;
  onClear: () => void;
  onToggleColor: () => void;
  coloredMode: boolean;
}) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg z-10">
      {/* Botón Animar */}
      <button
        onClick={onAnimate}
        className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        <PlayIcon className="w-5 h-5" />
        <span className="hidden md:inline">Animar Voronoi</span>
      </button>

      {/* Botón Random */}
      <button
        onClick={onRandom}
        className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
      >
        <SparklesIcon className="w-5 h-5" />
        <span className="hidden md:inline">Random</span>
      </button>

      {/* Botón Limpiar */}
      <button
        onClick={onClear}
        className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
      >
        <TrashIcon className="w-5 h-5" />
        <span className="hidden md:inline">Limpiar</span>
      </button>
      {coloredMode ? (
        <button
          onClick={onToggleColor}
          className="flex items-center gap-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition cursor-pointer"
        >
          <EyeSlashIcon className="w-5 h-5" />
          <span className="hidden md:inline">Ocultar colores</span>
        </button>
      ) : (
        <button
          onClick={onToggleColor}
          className="flex items-center gap-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition cursor-pointer"
        >
          <EyeIcon className="w-5 h-5" />
          <span className="hidden md:inline">Mostrar colores</span>
        </button>
      )}
    </div>
  );
}
