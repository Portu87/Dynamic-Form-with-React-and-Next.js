import { Container } from "@/components/Containers"
import Form, { FormField } from "@/components/Form/Form"


const fields:FormField[] = [
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
  }
]
export default function Home() {
  return (
    <Container>
      <h1>Home</h1>
      <Form fields={fields}
            image 
            submitText={"Crear Categoría"} 
            type={"Categoría"} 
            revalidateUrl={'/'} />  
    </Container>
  )
}
