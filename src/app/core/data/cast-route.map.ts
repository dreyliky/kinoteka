import { AppRouteEnum, CastTypeEnum } from '@core/enums';
import { CastDto } from '@core/interfaces';

export const CAST_ROUTE_HANDLER_MAP = new Map<CastTypeEnum, (castDto: CastDto) => string>()
    .set(
        CastTypeEnum.OnlineFilm,
        ({ data }) => `/${AppRouteEnum.OnlineFilmDetails}/${data}`
    )
    .set(
        CastTypeEnum.DownloadedFilm,
        ({ data }) => `/${AppRouteEnum.DownloadedFilmDetails}/${data}`
    );
