import { Container, interfaces } from "inversify";
import { Project, LayerDirectory, ElementFile, SvgFile, PngFile } from "./entities";

const container = new Container();
container.bind<Project>("Project").to(Project);

container.bind<LayerDirectory>("LayerDirectory").to(LayerDirectory);
container
  .bind<interfaces.Factory<LayerDirectory>>("Factory<LayerDirectory>")
  .toFactory<LayerDirectory>((context: interfaces.Context) => {
    return () => {
      return context.container.get<LayerDirectory>("LayerDirectory");
    };
  });

container.bind<ElementFile>("ElementFile").to(ElementFile);
container
  .bind<interfaces.Factory<ElementFile>>("Factory<ElementFile>")
  .toFactory<ElementFile>((context: interfaces.Context) => {
    return () => {
      return context.container.get<ElementFile>("ElementFile");
    };
  });

container.bind<SvgFile>("SvgFile").to(SvgFile);
container.bind<PngFile>("PngFile").to(PngFile);

export { container };
