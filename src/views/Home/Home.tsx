import { AppView } from "components"
import LLCodeBlock from "components/common/LLCodeBlock"
import CODE from "data"

export default function Home() {
  return (
    <AppView className="mb-20">
      {
        CODE.map((item, index) => {
          return (
            <LLCodeBlock 
              key={index}
              title={item.title}
              code={item.code}
            />
          )
        })
      }
    </AppView>
  )
}
