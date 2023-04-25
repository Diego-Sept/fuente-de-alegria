import { Injectable } from '@angular/core';
import { Budget, CreateBudgetDto } from 'app/pages/budgets/interface/budget.interface';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BudgetService } from '../services/budget.service';
import { BudgetState } from '../states/budget.state';


@Injectable({
    providedIn: 'root',
})
export class BudgetFacade {

    constructor(
        private budgetState: BudgetState,
        private budgetService: BudgetService
    ) { }

    // LOAD
    loadBudgets(qps?) {

        this.budgetState.setLoadingGetBudgets(true);

        const promise: Promise<any> = new Promise((resolve, reject) => {
            this.budgetService.getBudgets(qps).pipe(
                finalize(() => this.budgetState.setLoadingGetBudgets(false))
            ).subscribe(
                // Success
                response => {
                    this.budgetState.setBudgets(response)
                },
                // Error
                (e) => {
                    this.budgetState.setLoadingGetBudgets(false);
                    reject(e)
                },
            )
        })
        return from(promise);
    }

    getBudgets() : Observable<Budget[]>{
        return this.budgetState.getBudgets$();
    }

    getBudgetsValue() : Budget[]{
        return this.budgetState.getBudgets();
    }

    // ADD - CREATE
    addBudget(budget: CreateBudgetDto): any | Observable<Budget> {
        this.budgetState.setLoadingCreatingBudget(true);

        const promise: Promise<Budget> = new Promise((res, rej) => {
            this.budgetService.postBudget(budget).pipe(
                finalize(() => this.budgetState.setLoadingCreatingBudget(false))
            ).subscribe(
                // Add al store
                (budget) => { this.budgetState.addBudget(budget); res(budget) },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    // DELETE
    deleteBudget(id: number) {
        this.budgetState.setLoadingDeletingBudget(true);

        const promise: Promise<void> = new Promise((res, rej) => {
            this.budgetService.deleteBudget(id).pipe(
                finalize(() => this.budgetState.setLoadingDeletingBudget(false))
            ).subscribe(
                (response) => { 
                    this.budgetState.deleteBudget(id);
                    res(response);
                },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    // UPDATE - PATCH
    updateBudget(id: number, budget: CreateBudgetDto): Observable<Budget> {
        this.budgetState.setLoadingUpdatingBudget(true);

        const promise: Promise<Budget> = new Promise((res, rej) => {
            this.budgetService.patchBudget(id, budget).pipe(
                finalize(() => this.budgetState.setLoadingUpdatingBudget(false))
            ).subscribe(
                (budget) => { this.budgetState.updateBudget(budget, budget.id); res(budget) },
                (e) => rej(e)
            )
        })
        return from(promise);
    }

    getBudgetById(id: number) {
        return this.getBudgetsValue().find(budget => budget.id == id);
    }


}