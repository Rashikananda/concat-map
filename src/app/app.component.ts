import { Component } from '@angular/core';
import { Observable, merge, throwError, timer, interval, from, of, forkJoin } from 'rxjs';
import { switchMap, tap, takeUntil, delay, mergeMap, concatMap, map, concatAll, combineAll, toArray } from 'rxjs/operators';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  contacts;
  rootSource$ = of([{ x: 30, y: 4 }, { x: 2, y: 4 }, { x: 1, y: 4 }]);
  ros$;
  p = async (x) => {
    const oneSecondSource = of(x['x']).pipe(delay(100 * x.x))
    const twoSecondSource = of(x.y).pipe(delay(200 * x.y))
    x['z'] = await forkJoin(oneSecondSource, twoSecondSource).pipe(map(abs => abs[0] / abs[1])).toPromise()
    return x
  }
  constructor() {
    const example1 = this.rootSource$.pipe(concatMap(q => forkJoin(...q.map((this.p)))));
    example1.subscribe(a => console.log(a));
    this.contacts = example1;
  }
}
