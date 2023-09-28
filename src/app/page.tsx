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
export default function Home() {
  return (
    <Container>
      <FlexContainer center className="items-center my-7 space-y-8">
        <h1 className="text-2xl text-bold">Form dinamic</h1>
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
