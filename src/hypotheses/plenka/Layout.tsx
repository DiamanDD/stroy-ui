import { Outlet } from 'react-router';
import { InquiryDialog } from '@/hypotheses/plenka/components/inquiry-dialog';
import { QuoteProvider } from '@/hypotheses/plenka/components/quote-provider';
import { SiteFooter } from '@/hypotheses/plenka/components/site-footer';
import { SiteHeader } from '@/hypotheses/plenka/components/site-header';
import './styles.css';

export default function PlenkaLayout() {
  return (
    <div className="plenka-root flex min-h-full flex-col antialiased">
      <QuoteProvider>
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <InquiryDialog />
      </QuoteProvider>
    </div>
  );
}
