
import { useState, useEffect } from 'react';
import { X, Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileMenuProps {
  menuItems: {
    name: string;
    href: string;
  }[];
}

const MobileMenu = ({ menuItems }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  // Close menu when switching to desktop
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        className="flex items-center p-2 text-navy"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-navy/95 text-white flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <h2 className="text-xl font-serif font-bold">Menu</h2>
            <button
              className="p-2 text-white"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            <nav className="p-4">
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="block py-3 text-lg font-medium border-b border-white/10"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
