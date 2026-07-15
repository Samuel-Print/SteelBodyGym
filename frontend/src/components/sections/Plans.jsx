import { useState, useEffect, useRef, useMemo, useCallback, useLayoutEffect } from 'react';
import { Icon } from '../common/Icons';
import { money, fmtDate } from '../../data/data';
import promoService from '../../features/promotions/api/promotion.service';
import planService from '../../features/plans/api/plans.service';

const AUTOPLAY_INTERVAL = 5000;
const TRANSITION_MS = 900;
const PLANS_VISIBLE_COLLAPSED = 5;

const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const Plans = () => {
  const [promos, setPromos] = useState([]);
  const [promosLoading, setPromosLoading] = useState(true);

  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(true);

  useEffect(() => {
    const loadPromos = async () => {
      try {
        setPromosLoading(true);
        const data = await promoService.getAll({ activo: true });
        setPromos(Array.isArray(data) ? data : data?.items ?? []);
      } catch (error) {
        console.error('Error al cargar las promociones:', error);
        setPromos([]);
      } finally {
        setPromosLoading(false);
      }
    };

    loadPromos();
  }, []);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        setPlansLoading(true);
        const data = await planService.getAll({ activo: true });
        setPlans(Array.isArray(data) ? data : data?.items ?? []);
      } catch (error) {
        console.error('Error al cargar los planes:', error);
        setPlans([]);
      } finally {
        setPlansLoading(false);
      }
    };

    loadPlans();
  }, []);

  const formatTiempo = (meses) => {
    const value = Number(meses);
    if (value >= 1) return `${value} ${value === 1 ? 'mes' : 'meses'}`;
    const dias = Math.round(value * 30);
    return `${dias} día${dias === 1 ? '' : 's'}`;
  };

  // Filtro de seguridad: si el backend no filtró los inactivos, los quitamos aquí.
  const activePromos = useMemo(
    () => promos.filter((p) => !(p.activo === false || p.activo === 0 || p.activo === '0')),
    [promos]
  );

  // Planes ordenados de menor a mayor duración
  const sortedPlans = useMemo(
    () => [...plans].sort((a, b) => Number(a.tiempo_meses) - Number(b.tiempo_meses)),
    [plans]
  );

  // ---------- Expand/collapse suave de la tabla de planes (una sola tabla real) ----------
  const [plansExpanded, setPlansExpanded] = useState(false);
  const hasHiddenPlans = sortedPlans.length > PLANS_VISIBLE_COLLAPSED;
  const hiddenPlansCount = sortedPlans.length - PLANS_VISIBLE_COLLAPSED;

  const tableRef = useRef(null);
  const lastVisibleRowRef = useRef(null);
  const [collapsedHeight, setCollapsedHeight] = useState(undefined);
  const [expandedHeight, setExpandedHeight] = useState(undefined);

  useLayoutEffect(() => {
    if (!tableRef.current) return;

    setExpandedHeight(tableRef.current.scrollHeight);

    if (lastVisibleRowRef.current) {
      const tableTop = tableRef.current.getBoundingClientRect().top;
      const rowBottom = lastVisibleRowRef.current.getBoundingClientRect().bottom;
      setCollapsedHeight(rowBottom - tableTop);
    } else {
      setCollapsedHeight(tableRef.current.scrollHeight);
    }
  }, [sortedPlans, plansLoading]);

  useEffect(() => {
    setPlansExpanded(false);
  }, [sortedPlans.length]);

  const wrapperMaxHeight = !hasHiddenPlans
    ? 'none'
    : plansExpanded
      ? expandedHeight
      : collapsedHeight;

  // ---------- Carrusel infinito de promociones ----------
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const getItemsPerView = () => {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    };

    const handleResize = () => setItemsPerView(getItemsPerView());
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const groups = useMemo(
    () => chunkArray(activePromos, itemsPerView),
    [activePromos, itemsPerView]
  );
  const totalGroups = groups.length;
  const isLoop = totalGroups > 1;

  // Con loop: agregamos un clon del último grupo al inicio y uno del primero al final.
  const extendedGroups = useMemo(() => {
    if (!isLoop) return groups;
    return [groups[totalGroups - 1], ...groups, groups[0]];
  }, [groups, totalGroups, isLoop]);

  const [currentIndex, setCurrentIndex] = useState(isLoop ? 1 : 0);
  const [enableTransition, setEnableTransition] = useState(true);
  const isAnimating = useRef(false);
  const isPaused = useRef(false);

  // Si cambia el número de grupos (resize, o llegan nuevas promos), reiniciamos sin animar.
  useEffect(() => {
    setEnableTransition(false);
    setCurrentIndex(isLoop ? 1 : 0);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEnableTransition(true));
    });
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalGroups, itemsPerView]);

  const goNext = useCallback(() => {
    if (isAnimating.current || totalGroups <= 1) return;
    isAnimating.current = true;
    setCurrentIndex((prev) => prev + 1);
  }, [totalGroups]);

  const goPrev = useCallback(() => {
    if (isAnimating.current || totalGroups <= 1) return;
    isAnimating.current = true;
    setCurrentIndex((prev) => prev - 1);
  }, [totalGroups]);

  const goToSlide = useCallback((realIndex) => {
    if (isAnimating.current || totalGroups <= 1) return;
    isAnimating.current = true;
    setCurrentIndex(realIndex + (isLoop ? 1 : 0));
  }, [totalGroups, isLoop]);

  // Al terminar la transición: si caímos en un clon, saltamos sin animar al real correspondiente.
  const handleTransitionEnd = () => {
    isAnimating.current = false;

    if (!isLoop) return;

    if (currentIndex === extendedGroups.length - 1) {
      setEnableTransition(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setEnableTransition(false);
      setCurrentIndex(totalGroups);
    }
  };

  // Re-habilita la transición un frame después de un salto instantáneo.
  useEffect(() => {
    if (!enableTransition) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setEnableTransition(true));
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [enableTransition]);

  useEffect(() => {
    if (!isLoop) return;

    const interval = setInterval(() => {
      if (!isPaused.current) goNext();
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isLoop, goNext]);

  const activeDotIndex = totalGroups > 0
    ? (((currentIndex - (isLoop ? 1 : 0)) % totalGroups) + totalGroups) % totalGroups
    : 0;

  // Drag / swipe manual
  const dragStartX = useRef(null);
  const dragDeltaX = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (clientX) => {
    if (isAnimating.current) return;
    dragStartX.current = clientX;
    dragDeltaX.current = 0;
    setIsDragging(true);
    isPaused.current = true;
  };

  const handleDragMove = (clientX) => {
    if (dragStartX.current === null) return;
    dragDeltaX.current = clientX - dragStartX.current;
  };

  const handleDragEnd = () => {
    const threshold = 50;
    if (dragDeltaX.current > threshold) {
      goPrev();
    } else if (dragDeltaX.current < -threshold) {
      goNext();
    }
    dragStartX.current = null;
    dragDeltaX.current = 0;
    setIsDragging(false);
    isPaused.current = false;
  };

  return (
    <section id="planes" className="py-[60px] md:py-[84px] bg-[var(--surface)]">
      <div className="container-custom">
        <div className="section-head max-w-[760px] mx-auto text-center mb-16">
          <span className=" inline-flex
              items-center
              gap-2
              rounded-full
              bg-[var(--badge-bg)]
              px-[14px]
              py-[6px]
              text-[0.76rem]
              font-bold
              uppercase
              tracking-[2px]
              text-[#3696E5]">
            <Icon name="tag" className="w-4 h-4" />
            Planes y precios
          </span>
          <h2 className="mt-5 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.1] font-extrabold font-head">Elige el plan ideal para ti</h2>
          <p className="mt-5 max-w-[640px] mx-auto text-[1.12rem] text-[var(--muted)] leading-8">Promociones vigentes y todos nuestros planes en una tabla clara y transparente.</p>
        </div>

        {/* Promociones - Carrusel */}
        {promosLoading ? (
          <div className="text-center text-[var(--muted)] mb-12">Cargando promociones...</div>
        ) : activePromos.length === 0 ? (
          <div className="text-center text-[var(--muted)] mb-12">No hay promociones vigentes por el momento.</div>
        ) : (
          <div className="relative mb-12 px-0 sm:px-12 md:px-16">
            <div
              className="overflow-hidden select-none"
              onMouseEnter={() => { isPaused.current = true; }}
              onMouseLeave={() => { isPaused.current = false; if (isDragging) handleDragEnd(); }}
              onMouseDown={(e) => handleDragStart(e.clientX)}
              onMouseMove={(e) => isDragging && handleDragMove(e.clientX)}
              onMouseUp={handleDragEnd}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
              onTouchEnd={handleDragEnd}
            >
              <div
                className="flex"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: enableTransition ? `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)` : 'none',
                  cursor: isDragging ? 'grabbing' : (totalGroups > 1 ? 'grab' : 'default'),
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedGroups.map((group, slideIdx) => (
                  <div
                    key={slideIdx}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 shrink-0 w-full"
                  >
                    {group.map((promo, index) => (
                      <div key={promo.id_promocion ?? `${slideIdx}-${index}`} className="relative bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-[26px] overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)]" />
                        <span className="inline-flex items-center gap-[6px] text-[var(--accent)] font-bold text-[0.76rem] uppercase tracking-[1px]">
                          <Icon name="tag" className="w-[14px] h-[14px]" />
                          Promoción
                        </span>
                        <h4 className="text-[1.2rem] my-[10px] mb-[6px]">{promo.nombre}</h4>
                        <p className="text-[var(--muted)] text-[0.92rem]">{promo.descripcion}</p>
                        <span className="inline-flex items-center gap-[6px] mt-[14px] text-[0.8rem] text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-[5px] rounded-[30px] font-semibold">
                          <Icon name="clock" className="w-[14px] h-[14px]" />
                          Válida hasta {fmtDate(promo.caducacion)}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {totalGroups > 1 && (
              <>
                {/* Flechas: viven en el padding lateral, no encima de las cards */}
                <button
                  onClick={goPrev}
                  aria-label="Promociones anteriores"
                  className="absolute left-0 sm:-left-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-sm flex items-center justify-center text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] transition z-10"
                >
                  <svg className="w-5 h-5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={goNext}
                  aria-label="Siguientes promociones"
                  className="absolute right-0 sm:-right-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-sm flex items-center justify-center text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] transition z-10"
                >
                  <svg className="w-5 h-5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>

                {/* Dots */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {groups.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => goToSlide(dotIdx)}
                      aria-label={`Ir al grupo de promociones ${dotIdx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        dotIdx === activeDotIndex
                          ? 'w-6 bg-[var(--accent)]'
                          : 'w-2 bg-[var(--border)] hover:bg-[var(--muted)]'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Tabla de Planes */}
        <div className="overflow-hidden border border-[var(--border)] rounded-[var(--radius)] bg-[var(--surface)]">
          <div
            className="overflow-x-auto"
            style={{
              overflowY: 'hidden',
              maxHeight: wrapperMaxHeight,
              transition: `max-height ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
            }}
          >
            <table ref={tableRef} className="w-full border-collapse min-w-[540px] table-fixed">
              <thead>
                <tr>
                  <th className="w-1/3 text-left px-[24px] py-[18px] border-b border-[var(--border)] bg-[var(--surface-2)] text-[0.96rem] font-bold font-head">
                    Plan
                  </th>

                  <th className="w-1/3 text-center px-[24px] py-[18px] border-b border-[var(--border)] bg-[var(--surface-2)] text-[0.96rem] font-bold font-head">
                    Duración
                  </th>

                  <th className="w-1/3 text-center px-[24px] py-[18px] border-b border-[var(--border)] bg-[var(--surface-2)] text-[0.96rem] font-bold font-head">
                    Precio
                  </th>
                </tr>
              </thead>

              <tbody>
                {plansLoading ? (
                  <tr>
                    <td colSpan={3} className="text-center px-[24px] py-[24px] text-[var(--muted)]">
                      Cargando planes...
                    </td>
                  </tr>
                ) : sortedPlans.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center px-[24px] py-[24px] text-[var(--muted)]">
                      No hay planes disponibles por el momento.
                    </td>
                  </tr>
                ) : (
                  sortedPlans.map((plan, index) => (
                    <tr
                      key={plan.id_plan ?? index}
                      ref={index === PLANS_VISIBLE_COLLAPSED - 1 ? lastVisibleRowRef : null}
                      className="hover:bg-[var(--surface-2)] transition"
                    >
                      <td className="w-1/3 px-[24px] py-[18px] border-b border-[var(--border)] text-[0.96rem]">
                        {plan.nombre}
                      </td>

                      <td className="w-1/3 text-center px-[24px] py-[18px] border-b border-[var(--border)] text-[0.96rem]">
                        {formatTiempo(plan.tiempo_meses)}
                      </td>

                      <td className="w-1/3 text-center px-[24px] py-[18px] border-b border-[var(--border)]">
                        <span className="font-extrabold text-[var(--accent)] text-[1rem] font-head">
                          {money(plan.costo)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!plansLoading && hasHiddenPlans && (
            <button
              onClick={() => setPlansExpanded((prev) => !prev)}
              className="w-full flex items-center justify-center gap-2 px-[24px] py-[16px] bg-[var(--surface-2)] text-[0.92rem] font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)] transition border-t border-[var(--border)]"
            >
              {plansExpanded ? 'Ver menos' : `Ver todos los planes (${hiddenPlansCount} más)`}
              <svg
                className={`w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round transition-transform duration-300 ${
                  plansExpanded ? 'rotate-180' : ''
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          )}
        </div>

        <div className="text-center mt-8">
          <a href="https://forms.gle/dRj8R6kRPGVxvCUf6" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-3 whitespace-nowrap h-[55px]">
            <Icon name="user-plus" />
            Inscríbete con tu plan
          </a>
        </div>
      </div>
    </section>
  );
};

export default Plans;