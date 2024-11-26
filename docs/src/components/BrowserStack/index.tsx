import SVGTheme from '@site/src/components/SVGTheme';
import Light from '@site/static/img/browserstack-light.svg';
import Dark from '@site/static/img/browserstack-dark.svg';

type BrowserStackProps = {
    width: number;
    height: number;
};

export default function BrowserStack({ width, height }: BrowserStackProps) {
    return <SVGTheme width={width} height={height} Dark={Dark} Light={Light} />;
}
