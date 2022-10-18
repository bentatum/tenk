import { Container, interfaces } from "inversify";
import { Collection, Layer, Element, SvgFile, PngFile } from "./entities";

const container = new Container();
container.bind("Collection").to(Collection);

container.bind<Layer>("Layer").to(Layer);
container
  .bind<interfaces.Factory<Layer>>("Factory<Layer>")
  .toFactory<Layer>(
    (context: interfaces.Context) => () => context.container.get<Layer>("Layer")
  );

container.bind<Element>("Element").to(Element);
container
  .bind<interfaces.Factory<Element>>("Factory<Element>")
  .toFactory<Element>(
    (context: interfaces.Context) => () =>
      context.container.get<Element>("Element")
  );

container.bind<SvgFile>("SvgFile").to(SvgFile);
container.bind<PngFile>("PngFile").to(PngFile);

export { container };
