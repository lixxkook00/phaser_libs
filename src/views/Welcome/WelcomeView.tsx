import { AppView } from '../../components';
import LLCodeBlock  from '../../components/common/LLCodeBlock';
import CODE from '../../data';
/**
 * Renders "Welcome" view
 * url: /
 * @page Welcome
 */
const WelcomeView = () => {
  return (
    <AppView>
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
  );
};

export default WelcomeView;
