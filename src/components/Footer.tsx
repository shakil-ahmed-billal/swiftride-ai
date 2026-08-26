import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B132A] text-white pt-16 pb-12 px-6 md:px-16 border-t border-slate-800">
      <div className="max-w-[1440px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand & Vision Description */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="text-white font-semibold text-[32px] tracking-tight leading-[48px] inline-block"
            >
              Logo
            </Link>
            <p className="font-normal text-base text-slate-300 leading-[26px] max-w-[292px]">
              Our vision is to provide convenience and help increase your sales business.
            </p>

            {/* Social media circle badges - exact wireframe w-[34px] h-[34px] rounded-[16.8px] */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#discord"
                className="w-[34px] h-[34px] bg-black text-white rounded-[16.8px] flex items-center justify-center hover:bg-[#3563E9] transition-colors shadow"
                aria-label="Discord"
              >
                <span className="text-xs font-bold">Di</span>
              </a>
              <a
                href="#instagram"
                className="w-[34px] h-[34px] bg-black text-white rounded-[16.8px] flex items-center justify-center hover:bg-[#3563E9] transition-colors shadow"
                aria-label="Instagram"
              >
                <span className="text-xs font-bold">Ig</span>
              </a>
              <a
                href="#twitter"
                className="w-[34px] h-[34px] bg-black text-white rounded-[16.8px] flex items-center justify-center hover:bg-[#3563E9] transition-colors shadow"
                aria-label="Twitter"
              >
                <span className="text-xs font-bold">Tw</span>
              </a>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* About Column */}
            <div>
              <h4 className="font-semibold text-xl text-white tracking-tight mb-6">About</h4>
              <ul className="space-y-4 font-normal text-base text-slate-300">
                <li>
                  <Link href="#how-it-works" className="hover:text-white transition-colors">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="#featured" className="hover:text-white transition-colors">
                    Featured
                  </Link>
                </li>
                <li>
                  <Link href="#partnership" className="hover:text-white transition-colors">
                    Partnership
                  </Link>
                </li>
                <li>
                  <Link href="#business" className="hover:text-white transition-colors">
                    Business Relation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community Column */}
            <div>
              <h4 className="font-semibold text-xl text-white tracking-tight mb-6">Community</h4>
              <ul className="space-y-4 font-normal text-base text-slate-300">
                <li>
                  <Link href="#events" className="hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="#blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#podcast" className="hover:text-white transition-colors">
                    Podcast
                  </Link>
                </li>
                <li>
                  <Link href="#invite" className="hover:text-white transition-colors">
                    Invite a friend
                  </Link>
                </li>
              </ul>
            </div>

            {/* Socials Column */}
            <div>
              <h4 className="font-semibold text-xl text-white tracking-tight mb-6">Socials</h4>
              <ul className="space-y-4 font-normal text-base text-slate-300">
                <li>
                  <Link href="#discord" className="hover:text-white transition-colors">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="#instagram" className="hover:text-white transition-colors">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#twitter" className="hover:text-white transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#facebook" className="hover:text-white transition-colors">
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-300">
          <p className="font-semibold text-base">
            ©2026 Best Auto. All rights reserved
          </p>

          <div className="flex items-center gap-8 font-semibold text-base">
            <Link href="#privacy" className="hover:text-white transition-colors">
              Privacy &amp; Policy
            </Link>
            <Link href="#terms" className="hover:text-white transition-colors">
              Terms &amp; Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
