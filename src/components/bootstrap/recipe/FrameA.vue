<template>
    <div class="frame-a">
        <p>Frame A</p>
        <form class="frame-a-form">
            <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">姓名</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword" aria-describedby="input-sizing-sm">
                </div>
            </div>        
            <div class="input-group">
                <div class="input-group-text" id="btnGroupAddon">@</div>
                <input type="text" class="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon">
            </div>    
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">姓名</label>
                <div class="col-sm-10">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" name="sex" type="radio" id="inlineCheckbox1" value="option1">
                        <label class="form-check-label" for="inlineCheckbox1">男</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" name="sex" type="radio" id="inlineCheckbox2" value="option2">
                        <label class="form-check-label" for="inlineCheckbox2">女</label>
                    </div>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="selectType" class="col-sm-2 col-form-label">姓名</label>
                <div class="col-sm-10">
                    <select id="selectType" class="form-check-select form-select" aria-label="">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword">
                </div>
            </div>
        </form>
        <p>another form</p>
        <form>
            <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label col-form-label-sm">Email</label>
                <div class="col-sm-10">
                <input type="email" class="form-control form-control-sm" id="inputEmail3">
                </div>
            </div>
            <div class="row mb-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label col-form-label-sm">Password</label>
                <div class="col-sm-10">
                <input type="password" class="form-control form-control-sm" id="inputPassword3">
                </div>
            </div>
            <fieldset class="row mb-3">
                <legend class="col-form-label col-sm-2 pt-0">Radios</legend>
                <div class="col-sm-10">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked>
                    <label class="form-check-label" for="gridRadios1">
                    First radio
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input form-check-input-sm" type="radio" name="gridRadios" id="gridRadios2" value="option2">
                    <label class="form-check-label" for="gridRadios2">
                    Second radio
                    </label>
                </div>
                <div class="form-check disabled">
                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled>
                    <label class="form-check-label" for="gridRadios3">
                    Third disabled radio
                    </label>
                </div>
                </div>
            </fieldset>
            <div class="row mb-3">
                <div class="col-sm-10 offset-sm-2">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck1">
                    <label class="form-check-label" for="gridCheck1">
                    Example checkbox
                    </label>
                </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Sign in</button>
        </form>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
    name: 'Recipe.Frame.A',
})
</script>