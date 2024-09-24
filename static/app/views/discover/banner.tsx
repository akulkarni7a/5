import {useTheme} from '@emotion/react';

import tourAlert from 'sentry-images/spot/discover-tour-alert.svg';
import tourExplore from 'sentry-images/spot/discover-tour-explore.svg';
import tourFilter from 'sentry-images/spot/discover-tour-filter.svg';
import tourGroup from 'sentry-images/spot/discover-tour-group.svg';

import Banner from 'sentry/components/banner';
import {Button, LinkButton} from 'sentry/components/button';
import type {TourStep} from 'sentry/components/modals/featureTourModal';
import FeatureTourModal, {
  TourImage,
  TourText,
} from 'sentry/components/modals/featureTourModal';
import {t} from 'sentry/locale';
import type {Organization} from 'sentry/types/organization';
import {trackAnalytics} from 'sentry/utils/analytics';
import useMedia from 'sentry/utils/useMedia';

import BackgroundSpace from './backgroundSpace';

const docsUrl = 'https://docs.sentry.io/product/discover-queries/';

const docsLink = (
  <LinkButton external href={docsUrl}>
    {t('View Docs')}
  </LinkButton>
);

const TOUR_STEPS: TourStep[] = [
  {
    title: t('Explore Data over Time'),
    image: <TourImage src={tourExplore} />,
    body: (
      <TourText>
        {t(
          'Analyze and visualize all of your data over time to find answers to your most complex problems.'
        )}
      </TourText>
    ),
    actions: docsLink,
  },
  {
    title: t('Filter on Event Attributes.'),
    image: <TourImage src={tourFilter} />,
    body: (
      <TourText>
        {t(
          'Drill down on data by any custom tag or field to reduce noise and hone in on specific areas.'
        )}
      </TourText>
    ),
    actions: docsLink,
  },
  {
    title: t('Group Data by Tags'),
    image: <TourImage src={tourGroup} />,
    body: (
      <TourText>
        {t(
          'Go beyond Issues and create custom groupings to investigate events from a different lens.'
        )}
      </TourText>
    ),
    actions: docsLink,
  },
  {
    title: t('Save, Share and Alert'),
    image: <TourImage src={tourAlert} />,
    body: (
      <TourText>
        {t('Send insights to your team and set alerts to monitor any future spikes.')}
      </TourText>
    ),
  },
];

type Props = {
  organization: Organization;
  resultsUrl: string;
  showBuildNewQueryButton?: boolean;
};

function DiscoverBanner({
  organization,
  resultsUrl,
  showBuildNewQueryButton = true,
}: Props) {
  function onAdvance(step: number, duration: number) {
    trackAnalytics('discover_v2.tour.advance', {
      organization,
      step,
      duration,
    });
  }
  function onCloseModal(step: number, duration: number) {
    trackAnalytics('discover_v2.tour.close', {organization, step, duration});
  }

  const theme = useTheme();
  const isSmallBanner = useMedia(`(max-width: ${theme.breakpoints.medium})`);

  return (
    <Banner
      title={t('Discover Trends')}
      subtitle={t(
        'Customize and save queries by search conditions, event fields, and tags'
      )}
      backgroundComponent={<BackgroundSpace />}
      dismissKey="discover"
    >
      {showBuildNewQueryButton && (
        <LinkButton
          size={isSmallBanner ? 'xs' : undefined}
          translucentBorder
          to={resultsUrl}
          onClick={() => {
            trackAnalytics('discover_v2.build_new_query', {organization});
          }}
        >
          {t('Build a new query')}
        </LinkButton>
      )}
      <FeatureTourModal
        steps={TOUR_STEPS}
        doneText={t('View all Events')}
        doneUrl={resultsUrl}
        onAdvance={onAdvance}
        onCloseModal={onCloseModal}
      >
        {({showModal}) => (
          <Button
            size={isSmallBanner ? 'xs' : undefined}
            translucentBorder
            onClick={() => {
              trackAnalytics('discover_v2.tour.start', {organization});
              showModal();
            }}
          >
            {t('Get a Tour')}
          </Button>
        )}
      </FeatureTourModal>
    </Banner>
  );
}

export default DiscoverBanner;
