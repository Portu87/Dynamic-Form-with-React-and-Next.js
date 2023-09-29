"use client";

/**
 * Componente ButtonSpinner para botones con un spinner de carga.
 * @param {object} props - Las propiedades para el componente ButtonSpinner.
 * @param {"submit" | "button"} props.type - El tipo de botón (enviar o regular).
 * @param {string} props.className - Las clases de CSS para aplicar al botón.
 * @param {string} [props.text=""] - Opcional. El texto a mostrar en el botón.
 * @param {() => void} [props.onClick] - Opcional. El controlador del evento de clic para el botón.
 * @param {boolean} [props.isPending] - Opcional. Indica si el botón está en un estado pendiente o de carga.
 * @param {React.ReactNode} [props.icon] - Opcional. Un elemento de icono para mostrar junto al texto.
 * @returns {React.FC} - Un componente funcional de React que representa el botón con un spinner de carga.
 */


import { cn } from "@/libs/utils";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { FaSpinner } from "react-icons/fa";

interface Props {
  type: "submit" | "button";
  className: string;
  text?: string;
  onClick?: () => void;
  isPending?: boolean;
  icon?: React.ReactNode;
}

const ButtonSpinner = ({
  text = "",
  className = "",
  type,
  onClick,
  isPending,
  icon,
}: Props) => {

  /**
   * Obtener el estado pendiente del hook useFormStatus.
   */
  const { pending } = useFormStatus();
  const loading = pending || isPending;

  return (
    <button
      type={type}
      disabled={loading}
      onClick={type !== "submit" ? onClick : undefined}
      className={cn(
        "p-2 min-w-full border-none rounded-md grid place-items-center h-full",
        className
      )}
    >
      {loading ? (
        <span className="block animate-spin">
          <FaSpinner className="transform rotate-90" />
        </span>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {text}
        </>
      )}
    </button>
  );
};

export default ButtonSpinner;
