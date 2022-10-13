import { Container, interfaces } from "inversify";
import { Collection, Layer, Element, Rules } from "./entities";

const container = new Container();

container.bind<Collection>("Collection").to(Collection);

container.bind<Layer>("Layer").to(Layer);
container
  .bind<interfaces.Factory<Layer>>("Factory<Layer>")
  .toFactory<Layer>((context: interfaces.Context) => {
    return () => {
      return context.container.get<Layer>("Layer");
    };
  });

container.bind<Element>("Element").to(Element);
container
  .bind<interfaces.Factory<Element>>("Factory<Element>")
  .toFactory<Element>((context: interfaces.Context) => {
    return () => {
      return context.container.get<Element>("Element");
    };
  });

container.bind("Rules").to(Rules);

export { container };
