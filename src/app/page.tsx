/**
 * This module provides a React component for the home page.
 *
 * @module Home
 */

import { Container, FlexContainer } from "@/components/Containers";
import Form, { FormField } from "@/components/Form/Form";

const fields: FormField[] = [
  {
    type: "text",
    name: "name",
    placeholder: "Nombre de la categoría",
    validations: [{ type: "string", min: 2, max: 50, trim: true }],
  },
  {
    type: "textarea",
    name: "description",
    placeholder: "Descripción de la categoría",
    validations: [{ type: "string", min: 2, max: 200, trim: true }],
  },
];

/**
 * The home page component.
 *
 * @component
 * @returns {JSX.Element} The rendered home page.
 */
export default function Home() {
  return (
    <Container>
      <FlexContainer center className="items-center my-7 space-y-8">
        <h1 className="text-2xl font-bold">Form dinamic</h1>
        <Form
          fields={fields}
          image
          submitText={"Crear Categoría"}
          type={"Categoría"}
          revalidateUrl={"/"}
        />
      </FlexContainer>
    </Container>
  );
}
