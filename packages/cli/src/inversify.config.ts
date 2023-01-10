import { Container, interfaces } from "inversify";
import {
  Collection,
  Config,
  Layer,
  Element,
  SvgFile,
  PngFile,
} from "./entities";
import { Logger } from "./entities/Logger";

const container = new Container();
container.bind("Collection").to(Collection);
container.bind("Config").to(Config);

container.bind<Layer>("Layer").to(Layer);
container
  .bind<interfaces.Factory<Layer>>("Factory<Layer>")
  .toFactory<Layer>(
    (context: interfaces.Context) => () => context.container.get<Layer>("Layer")
  );

container.bind<Logger>("Logger").to(Logger);

container.bind<Element>("Element").to(Element);
container
  .bind<interfaces.Factory<Element>>("Factory<Element>")
  .toFactory<Element>(
    (context: interfaces.Context) => () =>
      context.container.get<Element>("Element")
  );

container.bind<SvgFile>("SvgFile").to(SvgFile);
container
  .bind<interfaces.Factory<SvgFile>>("Factory<SvgFile>")
  .toFactory<SvgFile>(
    (context: interfaces.Context) => () =>
      context.container.get<SvgFile>("SvgFile")
  );

container.bind<PngFile>("PngFile").to(PngFile);

export { container };
