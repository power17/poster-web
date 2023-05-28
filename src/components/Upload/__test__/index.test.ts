import { beforeAll, describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import { VueWrapper, flushPromises, shallowMount } from '@vue/test-utils'
import Uploader from '../index.vue'
let wrapper: VueWrapper<any>
// const mockAxios = axios
const spy = vi.spyOn(axios, 'post')
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })
// const mockAxios = vi.mock('axios')
describe('upload.vue', () => {
    beforeAll(() => {
        wrapper = shallowMount(Uploader, {
            props: {
                actions: '/api/utils/upload-img',
            },
        })
    })
    it('basic layout before upload', () => {
        expect(wrapper.find('button').exists()).toBeTruthy()
        expect(wrapper.get('button span').text()).toBe('点击上传')
        expect(wrapper.get('input').isVisible()).toBeFalsy()
    })
    it('upload file process', async () => {
        spy.mockResolvedValueOnce({ data: { data: { code: '234' } } })
        spy.mockResolvedValueOnce({ data: { data: { token: '234' } } })
        spy.mockResolvedValueOnce({ data: { data: { token: '1234' } } })

        // spy.mockImplementationOnce(async () => 'jsofjd')
        // 添加fileList（上传文件）
        const fileInput = wrapper.get('input').element as HTMLInputElement
        const files = [testFile] as any
        Object.defineProperty(fileInput, 'files', {
            value: files,
            writable: false,
        })
        // 正在上传
        await wrapper.get('input').trigger('change')
        expect(spy).toHaveBeenCalledTimes(2) // ??
        expect(wrapper.get('button span').text()).toBe('正在上传')
        expect(wrapper.get('button').attributes()).toHaveProperty('disabled')
        expect(wrapper.findAll('li').length).toBe(1)
        const firstItem = wrapper.get('li:first-child')
        expect(firstItem.classes()).toContain('upload-loading')
        // 上传成功
        await flushPromises()
        expect(spy).toHaveBeenCalledTimes(3)
        expect(wrapper.get('button span').text()).toBe('点击上传')
        expect(firstItem.classes()).toContain('upload-success')
        expect(firstItem.get('.filename').text()).toBe(testFile.name)
    })
    it('upload Reject', async () => {
        spy.mockRejectedValueOnce({ error: 'error' })

        await wrapper.get('input').trigger('change')
        expect(wrapper.get('button span').text()).toBe('正在上传')
        await flushPromises()
        expect(wrapper.get('button span').text()).toBe('点击上传')
        // 待实现
        expect(wrapper.findAll('li').length).toBe(2)
        const lastItem = wrapper.get('li:last-child')
        expect(lastItem.classes()).toContain('upload-error')
        await lastItem.get('.delete-icon').trigger('click')

        expect(wrapper.findAll('li').length).toBe(1)
    })
})
