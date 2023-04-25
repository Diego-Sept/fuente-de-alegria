import { BaseState } from './base.state';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Budget } from 'app/pages/budgets/interface/budget.interface';


@Injectable({
    providedIn: 'root',
})
export class BudgetState extends BaseState {

    store = {

        budget$: new BehaviorSubject<Budget[]>(null),

        loadingGetBudgets$: new BehaviorSubject<boolean>(false),
        loadingCreationBudget$: new BehaviorSubject<boolean>(false),
        loadingUpdatingBudget$: new BehaviorSubject<boolean>(false),
        loadingDeletingBudget$: new BehaviorSubject<boolean>(false),

    }

    // Categories of Evolutions
    getBudgets$() {
        return this.store.budget$.asObservable();
    }

    getBudgets(): Budget[] {
        return this.store.budget$.value;
    }

    setBudgets(budgets: Budget[]) {
        this.store.budget$.next(budgets);
    }

    isLoadingGetBudgets$() {
        return this.store.loadingGetBudgets$.asObservable();
    }

    setLoadingGetBudgets(isLoadingGetBudgets: boolean) {
        this.store.loadingGetBudgets$.next(isLoadingGetBudgets);
    }

    // ADD
    isLoadingCreatingBudget$() {
        return this.store.loadingCreationBudget$.asObservable();
    }

    setLoadingCreatingBudget(isLoadingCreatingBudgets: boolean) {
        this.store.loadingCreationBudget$.next(isLoadingCreatingBudgets);
    }

    isLoadingUpdatingBudget$() {
        return this.store.loadingUpdatingBudget$.asObservable();
    }

    setLoadingUpdatingBudget(loadingUpdatingBudget: boolean) {
        this.store.loadingUpdatingBudget$.next(loadingUpdatingBudget);
    }

    isLoadingDeletingBudget$() {
        return this.store.loadingDeletingBudget$.asObservable();
    }

    setLoadingDeletingBudget(loadingDeletingBudget: boolean) {
        this.store.loadingDeletingBudget$.next(loadingDeletingBudget);
    }

    addBudget(budget: Budget) {
        this.add<Budget>({ data: budget, storeRefAttribute: this.store.budget$ })
    }

    deleteBudget(budgetId: number) {
        this.delete<Partial<Budget[]>>({ dataId: budgetId, storeRefAttribute: this.store.budget$ });
    }

    updateBudget(budget: Partial<Budget>, entidadId: number) {
        this.update<Partial<Budget>>({ data: budget, dataId: entidadId, storeRefAttribute: this.store.budget$ })
    }

}