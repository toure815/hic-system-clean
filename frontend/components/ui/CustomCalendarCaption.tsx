import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CaptionProps, useDayPicker, useNavigation } from 'react-day-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CustomCalendarCaption(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const { fromYear, toYear, fromMonth, toMonth } = useDayPicker();

  const [yearValue, setYearValue] = React.useState(props.displayMonth.getFullYear());
  const [monthValue, setMonthValue] = React.useState(props.displayMonth.getMonth());

  React.useEffect(() => {
    setYearValue(props.displayMonth.getFullYear());
    setMonthValue(props.displayMonth.getMonth());
  }, [props.displayMonth]);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = Number(e.target.value);
    setYearValue(year);
    if (String(year).length === 4) {
      const newDate = new Date(year, monthValue);
      if (fromMonth && newDate < fromMonth) {
        goToMonth(fromMonth);
      } else if (toMonth && newDate > toMonth) {
        goToMonth(toMonth);
      } else {
        goToMonth(newDate);
      }
    }
  };

  const handleMonthChange = (value: string) => {
    const month = Number(value);
    setMonthValue(month);
    const newDate = new Date(yearValue, month);
    goToMonth(newDate);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex items-center gap-1">
        <Select onValueChange={handleMonthChange} value={String(monthValue)}>
          <SelectTrigger className="w-[120px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, i) => (
              <SelectItem key={month} value={String(i)}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="number"
          className="w-[80px] h-8"
          value={yearValue}
          onChange={handleYearChange}
          min={fromYear}
          max={toYear}
        />
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'h-8 w-8')}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
          className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'h-8 w-8')}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
