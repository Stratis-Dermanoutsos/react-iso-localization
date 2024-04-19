// Exporting the IsoLocalizationProvider type
export type IsoLocalizationProviderProps = React.PropsWithChildren<{
    locales: {
        [key: string]: {
            [key: string]: string;
        }
    }
}>;

export type IsoLocalizationProvider = (props: IsoLocalizationProviderProps) => React.JSX.Element;
