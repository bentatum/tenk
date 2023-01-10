import { SvgFile } from "@/entities";
import { container } from "@/inversify.config";

describe('Factory<SvgFile>', () => {
    it('should be a function', () => {
        const svgFileFactory = container.get<() => SvgFile>('Factory<SvgFile>')
        expect(svgFileFactory()).toBeInstanceOf(SvgFile);
    });
})