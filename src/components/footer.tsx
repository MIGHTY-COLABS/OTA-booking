export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">LuxoGlobal</h3>
          <p className="text-sm">
            Experience premium travel with curated packages, luxury hotels, and seamless flight bookings.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>support@luxoglobal.com</li>
            <li>+1 (555) 123-4567</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
        © 2024 LuxoGlobal Holidays. All rights reserved.
      </div>
    </footer>
  );
}
