import { AppRouteEnum, CastTypeEnum } from '@core/enums';
import { CastDto } from '@core/interfaces';
import { WatchRoutingEnum } from '../../../pages/watch/enums';

export const CAST_ROUTE_HANDLER_MAP = new Map<CastTypeEnum, (castDto: CastDto) => string>()
    .set(
        CastTypeEnum.OnlineFilm,
        ({ data }) => `/${AppRouteEnum.Watch}/${WatchRoutingEnum.OnlineFilm}/${data}`
    )
    .set(
        CastTypeEnum.DownloadedFilm,
        ({ data }) => `/${AppRouteEnum.Watch}/${WatchRoutingEnum.DownloadedFilm}/${data}`
    )
    .set(
        CastTypeEnum.OnlineTvSeries,
        ({ data }) => `/${AppRouteEnum.Watch}/${WatchRoutingEnum.OnlineTvSeries}/${data}`
    )
    .set(
        CastTypeEnum.DownloadedVideo,
        ({ data }) => `/${AppRouteEnum.Watch}/${WatchRoutingEnum.DownloadedVideo}/${data}`
    );
