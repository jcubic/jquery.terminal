import SVGTheme from '@site/src/components/SVGTheme';
import Light from '@site/static/img/sqlitecloud-light.svg';
import Dark from '@site/static/img/sqlitecloud-dark.svg';

type SQLiteCloudProps = {
    width: number;
    height: number;
};

export default function SQLiteCloud({ width, height }: SQLiteCloudProps) {
    return <SVGTheme width={width} height={height} Dark={Dark} Light={Light} />;
}
